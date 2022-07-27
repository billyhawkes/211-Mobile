import ServiceItem from "@components/ServiceItem";
import { ErrorFound, Idle, Loading, NotFound } from "@components/ServiceState";
import theme from "@constants/theme";
import { API_URL } from "@env";
import { FontAwesome5 } from "@expo/vector-icons";
import useLocation, { UserLocation } from "@hooks/useLocation";
import Slider from "@react-native-community/slider";
import { Picker } from "@react-native-picker/picker";
import {
    createDrawerNavigator,
    DrawerContentComponentProps,
    DrawerContentScrollView,
    DrawerScreenProps,
} from "@react-navigation/drawer";
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
    Text,
    FlatList,
} from "react-native";
import { useQuery } from "react-query";

// SEARCH API
const searchKeywordRequest = async (
    keyword: string,
    { lat, lng }: UserLocation,
    { distance, sortType }: Filters
): Promise<ServiceResponse> => {
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
            Latitude: lat,
            Longitude: lng,
            SortOrder: sortType,
            Distance: distance,
            Search: "term",
            PageSize: 1000,
            Term: keyword,
        }),
    });
    const data: unknown = await res.json();
    return ServiceResponseSchema.parse(data);
};

// TYPES
export type Filters = {
    sortType: "best" | "distance" | "name";
    distance: number;
};

type FilterDrawerProps = {
    FilteredSearch: { filters: Filters };
};

type SearchForm = {
    keyword: string;
    filters: Filters;
};

// FILTERS DRAWER
const FilterDrawer = createDrawerNavigator<FilterDrawerProps>();

const FilterContent = (props: DrawerContentComponentProps) => {
    const { control, setValue } = useFormContext<SearchForm>();

    return (
        <DrawerContentScrollView
            {...props}
            style={{
                marginHorizontal: theme.spacing.lg,
            }}
        >
            <Text
                style={[
                    theme.textVariants.screenTitle,
                    { textAlign: "center" },
                ]}
            >
                Refine
            </Text>
            <Controller
                control={control}
                rules={{
                    required: true,
                }}
                render={({ field: { onBlur, value } }) => (
                    <View style={styles.filterRow}>
                        <Text>Sort Type</Text>
                        <Picker
                            style={{ flex: 1 }}
                            onBlur={onBlur}
                            selectedValue={value}
                            onValueChange={(itemValue) => {
                                setValue("filters.sortType", itemValue);
                            }}
                        >
                            <Picker.Item label="Best" value="best" />
                            <Picker.Item label="Distance" value="distance" />
                            <Picker.Item label="Name" value="name" />
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
                    <View style={[styles.filterRow, { borderBottomWidth: 1 }]}>
                        <Text>Distance</Text>
                        <Slider
                            style={{ height: theme.spacing.xl2, flex: 1 }}
                            minimumValue={1}
                            maximumValue={100}
                            minimumTrackTintColor="#999"
                            thumbTintColor={theme.colors.primary}
                            step={1}
                            maximumTrackTintColor="#aaa"
                            value={value}
                            onSlidingComplete={(value) =>
                                setValue("filters.distance", value)
                            }
                        />
                        <Text>{value} km</Text>
                    </View>
                )}
                name="filters.distance"
            />
        </DrawerContentScrollView>
    );
};

const SearchNavigator = () => {
    const methods = useForm<SearchForm>({
        defaultValues: {
            keyword: "",
            filters: {
                sortType: "best",
                distance: 100,
            },
        },
    });

    return (
        <FormProvider {...methods}>
            <FilterDrawer.Navigator
                screenOptions={{ drawerPosition: "right", headerShown: false }}
                drawerContent={(props) => <FilterContent {...props} />}
            >
                <FilterDrawer.Screen
                    name="FilteredSearch"
                    initialParams={{
                        filters: {
                            distance: 100,
                            sortType: "best",
                        },
                    }}
                    component={Search}
                />
            </FilterDrawer.Navigator>
        </FormProvider>
    );
};

// SEARCH SCREEN
const Search = ({
    route,
    navigation,
}: DrawerScreenProps<FilterDrawerProps, "FilteredSearch">) => {
    const { filters: defaultFilters } = route.params;
    const { control, getValues } = useFormContext<SearchForm>();
    const { location, defaultLocation } = useLocation();

    const { keyword, filters } = getValues();
    const { data, isLoading, isError, isIdle, refetch } = useQuery<
        ServiceResponse,
        unknown
    >(
        ["keyword", getValues(), location, filters],
        () =>
            searchKeywordRequest(
                getValues("keyword"),
                location ?? defaultLocation,
                filters ?? defaultFilters
            ),
        {
            cacheTime: 0,
            enabled: keyword !== "",
        }
    );

    const search = () => {
        refetch().catch(() => console.error("Failed to refetch."));
    };

    return (
        <SafeAreaView>
            <Text
                style={[
                    theme.textVariants.screenTitle,
                    { textAlign: "center" },
                ]}
            >
                Search
            </Text>
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
                />
            ) : null}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    input: {
        borderColor: "#ccc",
        borderWidth: 1,
        flex: 1,
        borderRadius: 5,
        paddingHorizontal: theme.spacing.lg,
        height: theme.spacing.xl2,
    },
    filterRow: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderTopWidth: 1,
        borderColor: "#ccc",
        height: theme.spacing.xl3,
    },
});

export default SearchNavigator;
