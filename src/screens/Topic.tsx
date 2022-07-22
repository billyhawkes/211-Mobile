import ScreenTitle from "@components/ScreenTitle";
import ServiceList from "@components/ServiceList";
import { ScreenProps } from "@features/navigation";
import { SearchState, useSearch } from "@features/search";
import useLocation from "@hooks/useLocation";
import { DrawerScreenProps } from "@react-navigation/drawer";
import React from "react";
import { SafeAreaView } from "react-native";

function Topic({ route }: DrawerScreenProps<ScreenProps, "Topic">) {
    const { name } = route.params;
    const { location } = useLocation();
    const { useTopicSearch } = useSearch();
    const { data, isLoading, isError } = useTopicSearch(name, location);

    return (
        <SafeAreaView>
            <ScreenTitle title={name} />
            <>{isLoading ? <SearchState state="loading" /> : null}</>
            <>{isError ? <SearchState state="error" /> : null}</>
            <>
                {data && data.RecordCount === "0" ? (
                    <SearchState state="not-found" />
                ) : null}
            </>
            <>{data ? <ServiceList services={data.Records} /> : null}</>
        </SafeAreaView>
    );
}

export default Topic;
