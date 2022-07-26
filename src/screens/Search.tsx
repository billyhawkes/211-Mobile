import ScreenTitle from "@components/ScreenTitle";
import ServiceList from "@components/ServiceList";
import theme from "@constants/theme";
import { FontAwesome5 } from "@expo/vector-icons";
import { SearchState, useSearch } from "@features/search";
import useLocation from "@hooks/useLocation";
import Slider from "@react-native-community/slider";
import { Picker } from "@react-native-picker/picker";
import {
    createDrawerNavigator,
    DrawerContentComponentProps,
    DrawerContentScrollView,
    DrawerScreenProps,
} from "@react-navigation/drawer";
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
} from "react-native";

export type Filters = {
    sortType: "best" | "distance" | "name";
    distance: number;
};

type FilterDrawerProps = {
    FilteredSearch: { filters: Filters };
};

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
            <ScreenTitle title="Refine" />
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

type SearchForm = {
    keyword: string;
    filters: Filters;
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

const Search = ({
    route,
    navigation,
}: DrawerScreenProps<FilterDrawerProps, "FilteredSearch">) => {
    const { filters } = route.params;
    const { control, getValues } = useFormContext<SearchForm>();
    const { useKeywordSearch } = useSearch();
    const { location, defaultLocation } = useLocation();

    const { data, isLoading, isError, isIdle, refetch } = useKeywordSearch(
        getValues("keyword"),
        location ?? defaultLocation,
        getValues("filters") ?? filters
    );

    const search = () => {
        refetch().catch(() => console.error("Failed to refetch."));
    };

    return (
        <SafeAreaView>
            <ScreenTitle title="Search" />
            <View
                style={{
                    display: "flex",
                    flexDirection: "row",
                    marginHorizontal: theme.spacing.lg,
                    alignItems: "center",
                    marginBottom: 15,
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
            <>{isLoading ? <SearchState state="loading" /> : null}</>
            <>{isError ? <SearchState state="error" /> : null}</>
            <>
                {data && data.RecordCount === "0" ? (
                    <SearchState state="not-found" />
                ) : null}
            </>
            <>{isIdle ? <SearchState state="waiting-to-search" /> : null}</>
            <>{data ? <ServiceList services={data.Records} /> : null}</>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    input: {
        borderColor: "#ccc",
        borderWidth: 1,
        flex: 1,
        borderRadius: 5,
        paddingHorizontal: 15,
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
