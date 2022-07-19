import ScreenContainer from "@components/layouts/ScreenContainer";
import SearchState from "@components/search/SearchState";
import ServiceList from "@components/service/ServiceList";
import useLocation from "@hooks/useLocation";
import useServices from "@hooks/useServices";
import { ScreenParameters } from "@navigation/ScreenOptions";
import { DrawerScreenProps } from "@react-navigation/drawer";
import React from "react";

function Topic({ route }: DrawerScreenProps<ScreenParameters, "Topic">) {
    const { name } = route.params;
    const { location } = useLocation();
    const { useTopicSearch } = useServices();
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
