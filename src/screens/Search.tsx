import ScreenContainer from "@components/layouts/ScreenContainer";
import SearchState from "@components/search/SearchState";
import ServiceList from "@components/service/ServiceList";
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
    const { useSearch } = useServices();
    const { location } = useLocation();
    const {
        data: services,
        isLoading,
        isError,
        isIdle,
        refetch,
    } = useSearch(getValues("keyword"), location);

    const search = () => {
        void (async () => {
            await refetch();
        })();
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
                    />
                )}
                name="keyword"
            />
            <>{isLoading ? <SearchState state="loading" /> : null}</>
            <>{isError ? <SearchState state="error" /> : null}</>
            <>
                {services && services.RecordCount === "0" ? (
                    <SearchState state="not-found" />
                ) : null}
            </>
            <>{isIdle ? <SearchState state="waiting-to-search" /> : null}</>
            <>{services ? <ServiceList services={services.Records} /> : null}</>
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
