import ScreenContainer from "@components/ScreenContainer";
import ServiceList from "@components/ServiceList";
import { ScreenProps } from "@features/navigation";
import { SearchState, useSearch } from "@features/search";
import useLocation from "@hooks/useLocation";
import { DrawerScreenProps } from "@react-navigation/drawer";
import React from "react";

function Topic({ route }: DrawerScreenProps<ScreenProps, "Topic">) {
    const { name } = route.params;
    const { location } = useLocation();
    const { useTopicSearch } = useSearch();
    const { data, isLoading, isError } = useTopicSearch(name, location);

    return (
        <ScreenContainer title={name}>
            <>{isLoading ? <SearchState state="loading" /> : null}</>
            <>{isError ? <SearchState state="error" /> : null}</>
            <>
                {data && data.RecordCount === "0" ? (
                    <SearchState state="not-found" />
                ) : null}
            </>
            <>{data ? <ServiceList services={data.Records} /> : null}</>
        </ScreenContainer>
    );
}

export default Topic;
