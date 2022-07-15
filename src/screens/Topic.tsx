import ScreenContainer from "@components/layouts/ScreenContainer";
import SearchState from "@components/search/SearchState";
import ServiceList from "@components/service/ServiceList";
import useLocation from "@hooks/useLocation";
import useServices from "@hooks/useServices";
import { DrawerScreenProps } from "@react-navigation/drawer";
import React from "react";

function Topic({ route }: DrawerScreenProps<ScreenParameters, "Topic">) {
    const { name } = route.params;
    const { useTopic } = useServices();
    const { location } = useLocation();
    const { data: services, isLoading, isError } = useTopic(name, location);

    return (
        <ScreenContainer title={name}>
            <>{isLoading ? <SearchState state="loading" /> : null}</>
            <>{isError ? <SearchState state="error" /> : null}</>
            <>
                {services && services.RecordCount === "0" ? (
                    <SearchState state="not-found" />
                ) : null}
            </>
            <>{services ? <ServiceList services={services.Records} /> : null}</>
        </ScreenContainer>
    );
}

export default Topic;
