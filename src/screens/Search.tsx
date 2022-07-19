import ScreenContainer from "@components/layouts/ScreenContainer";
import SearchState from "@components/services/SearchState";
import ServiceList from "@components/services/ServiceList";
import theme from "@constants/theme";
import useLocation from "@hooks/useLocation";
import useServices from "@hooks/useServices";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { TextInput, StyleSheet } from "react-native";

type FormData = {
    keyword: string;
};

const Search = () => {
    const { control, getValues } = useForm<FormData>();
    const { useKeywordSearch } = useServices();
    const { location } = useLocation();
    const { data, isLoading, isError, isIdle, refetch } = useKeywordSearch(
        getValues("keyword"),
        location
    );

    const search = () => {
        refetch().catch(() => console.error("Failed to refetch."));
    };

    return (
        <ScreenContainer title="Search">
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
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    input: {
        width: "100%",
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 15,
        marginBottom: 15,
        height: theme.spacing.xl2,
    },
});

export default Search;
