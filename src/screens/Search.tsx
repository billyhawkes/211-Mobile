import ScreenTitle from "@components/ScreenTitle";
import ServiceList from "@components/ServiceList";
import theme from "@constants/theme";
import { SearchState, useSearch } from "@features/search";
import useLocation from "@hooks/useLocation";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { TextInput, StyleSheet, SafeAreaView } from "react-native";

type FormData = {
    keyword: string;
};

const Search = () => {
    const { control, getValues } = useForm<FormData>();
    const { useKeywordSearch } = useSearch();
    const { location } = useLocation();
    const { data, isLoading, isError, isIdle, refetch } = useKeywordSearch(
        getValues("keyword"),
        location
    );

    const search = () => {
        refetch().catch(() => console.error("Failed to refetch."));
    };

    return (
        <SafeAreaView>
            <ScreenTitle title="Search" />
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
        borderRadius: 5,
        paddingHorizontal: 15,
        marginBottom: 15,
        marginHorizontal: theme.spacing.lg,
        height: theme.spacing.xl2,
    },
});

export default Search;
