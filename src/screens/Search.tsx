import ServiceItem from "@components/ServiceItem";
import { ErrorFound, Idle, Loading, NotFound } from "@components/ServiceState";
import Text from "@components/ui/Text";
import theme from "@constants/theme";
import { API_URL } from "@env";
import { FontAwesome5 } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import useLocation from "@hooks/useLocation";
import Slider from "@react-native-community/slider";
import { Picker } from "@react-native-picker/picker";
import {
    createDrawerNavigator,
    DrawerContentComponentProps,
    DrawerContentScrollView,
    DrawerScreenProps,
} from "@react-navigation/drawer";
import { UserLocationSchema } from "@typesGlobal/location";
import { ServiceResponse, ServiceResponseSchema } from "@typesGlobal/service";
import React from "react";
import {
    useForm,
    Controller,
    FormProvider,
    useFormContext,
} from "react-hook-form";
import {
    TextInput,
    StyleSheet,
    SafeAreaView,
    Pressable,
    View,
    FlatList,
} from "react-native";
import { useQuery, useQueryClient } from "react-query";
import { z } from "zod";

// TYPES
const SearchInputSchema = z.object({
    keyword: z.string(),
    filters: z.object({
        sortType: z.string(),
        distance: z.number().int().gte(1).lte(100),
    }),
    location: UserLocationSchema,
});

export type SearchInput = z.infer<typeof SearchInputSchema>;

// SEARCH API
const searchKeywordRequest = async ({
    keyword,
    location,
    filters,
}: SearchInput): Promise<ServiceResponse> => {
    const res = await fetch(`${API_URL}`, {
        method: "Post",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            Dataset: "on",
            Lang: "en",
            SearchType: "proximity",
            Latitude: location.lat,
            Longitude: location.lng,
            SortOrder: filters.sortType,
            Distance: filters.distance,
            Search: "term",
            PageSize: 1000,
            Term: keyword,
        }),
    });
    const data: unknown = await res.json();
    return ServiceResponseSchema.parse(data);
};

const SearchNavigator = () => {
    const { location, defaultLocation } = useLocation();
    const methods = useForm<SearchInput>({
        resolver: zodResolver(SearchInputSchema),
        defaultValues: {
            keyword: "",
            filters: {
                sortType: "best",
                distance: 100,
            },
            location: location ?? defaultLocation,
        },
    });

    return (
        <FormProvider {...methods}>
            <FilterDrawer.Navigator
                screenOptions={{ drawerPosition: "right", headerShown: false }}
                drawerContent={(props) => <FilterContent {...props} />}
            >
                <FilterDrawer.Screen name="FilteredSearch" component={Search} />
            </FilterDrawer.Navigator>
        </FormProvider>
    );
};

// FILTERS DRAWER
const FilterDrawer = createDrawerNavigator<{ FilteredSearch: undefined }>();

const FilterContent = (props: DrawerContentComponentProps) => {
    const { control, setValue, getValues } = useFormContext<SearchInput>();
    const queryClient = useQueryClient();

    const search = () => {
        queryClient
            .refetchQueries("search")
            .catch(() => console.error("Error"));
    };

    return (
        <DrawerContentScrollView
            {...props}
            style={{
                marginHorizontal: theme.spacing.lg,
            }}
        >
            <Text type="title">Refine</Text>
            <Controller
                control={control}
                rules={{
                    required: true,
                }}
                render={({ field: { onBlur, value } }) => (
                    <View style={styles.filterRow}>
                        <Text>Sort Type</Text>
                        <Picker
                            style={{ marginHorizontal: -8 }}
                            onBlur={onBlur}
                            selectedValue={value}
                            onValueChange={(itemValue) => {
                                setValue("filters.sortType", itemValue);
                                search();
                            }}
                            mode="dropdown"
                        >
                            <Picker.Item
                                label="Best"
                                value="best"
                                style={theme.textVariants.default}
                                fontFamily="Lato"
                            />
                            <Picker.Item
                                label="Distance"
                                value="distance"
                                style={theme.textVariants.default}
                                fontFamily="Lato"
                            />
                            <Picker.Item
                                label="Name"
                                value="name"
                                style={theme.textVariants.default}
                                fontFamily="Lato"
                            />
                        </Picker>
                    </View>
                )}
                name="filters.sortType"
            />
            <Controller
                control={control}
                rules={{
                    required: true,
                }}
                render={({ field: { value } }) => (
                    <View style={styles.filterRow}>
                        <Text>Distance</Text>
                        <View
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                marginLeft: -15,
                                marginTop: theme.spacing.md,
                            }}
                        >
                            <Slider
                                style={{ height: theme.spacing.xl2, flex: 1 }}
                                minimumValue={1}
                                maximumValue={100}
                                minimumTrackTintColor="#999"
                                thumbTintColor={theme.colors.primary}
                                step={1}
                                maximumTrackTintColor="#aaa"
                                value={value}
                                onSlidingComplete={(value) => {
                                    setValue("filters.distance", value);
                                    search();
                                }}
                            />
                            <Text>{value} km</Text>
                        </View>
                    </View>
                )}
                name="filters.distance"
            />
            <View style={styles.filterRow}>
                <Text>Location</Text>
                <View>
                    <Text>lat: {getValues("location.lat")}</Text>
                    <Text>lng: {getValues("location.lng")}</Text>
                </View>
            </View>
        </DrawerContentScrollView>
    );
};

// SEARCH SCREEN
const Search = ({
    navigation,
}: DrawerScreenProps<{ FilteredSearch: undefined }, "FilteredSearch">) => {
    const { control, getValues } = useFormContext<SearchInput>();

    const values = getValues();
    const { data, isLoading, isError, isIdle, refetch } = useQuery<
        ServiceResponse,
        unknown
    >(["search", values], () => searchKeywordRequest(values), {
        cacheTime: 0,
        enabled: !!values.keyword && values.keyword !== "",
    });

    const search = () => {
        refetch().catch(() => console.error("Failed to refetch."));
    };

    return (
        <SafeAreaView>
            <Text type="title">Search</Text>
            <View
                style={{
                    display: "flex",
                    flexDirection: "row",
                    marginHorizontal: theme.spacing.lg,
                    alignItems: "center",
                    marginBottom: theme.spacing.lg,
                }}
            >
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            selectionColor={theme.colors.primary}
                            onSubmitEditing={() => search()}
                            autoFocus={true}
                        />
                    )}
                    name="keyword"
                />
                <Pressable
                    onPress={() => navigation.openDrawer()}
                    style={{
                        paddingLeft: theme.spacing.lg,
                        height: theme.spacing.xl2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <FontAwesome5 name="sliders-h" size={20} color="#777" />
                </Pressable>
            </View>
            {isLoading ? (
                <Loading skeletons={10} />
            ) : isError ? (
                <ErrorFound />
            ) : data && data.RecordCount === "0" ? (
                <NotFound />
            ) : isIdle ? (
                <Idle />
            ) : null}
            {data ? (
                <FlatList
                    data={data.Records}
                    renderItem={({ item }) => <ServiceItem service={item} />}
                    style={{ marginHorizontal: theme.spacing.lg }}
                />
            ) : null}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    input: {
        flex: 1,
        borderRadius: 5,
        paddingHorizontal: theme.spacing.lg,
        height: theme.spacing.xl2,
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
    filterRow: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        paddingVertical: theme.spacing.lg,
    },
});

export default SearchNavigator;
