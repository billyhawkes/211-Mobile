import { ScreenProps } from "@components/Navigation";
import ServiceItem from "@components/ServiceItem";
import { ErrorFound, Loading, NotFound } from "@components/ServiceState";
import Text from "@components/ui/Text";
import { API_URL } from "@env";
import useLocation from "@hooks/useLocation";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { UserLocation } from "@typesGlobal/location";
import { ServiceResponse, ServiceResponseSchema } from "@typesGlobal/service";
import React from "react";
import { FlatList, SafeAreaView } from "react-native";
import { useQuery } from "react-query";

const searchTopicRequest = async (
    topic: string,
    { lat, lng }: UserLocation
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
            Distance: 100,
            Search: "match",
            MatchMode: "taxterm",
            PageSize: 1000,
            MatchTerms: topic,
        }),
    });
    const data: unknown = await res.json();
    return ServiceResponseSchema.parse(data);
};

const Topic = ({ route }: DrawerScreenProps<ScreenProps, "Topic">) => {
    const { name } = route.params;
    const { location, defaultLocation } = useLocation();

    const { data, isLoading, isError } = useQuery<ServiceResponse, unknown>(
        ["topic", name, location],
        () => searchTopicRequest(name, location ?? defaultLocation)
    );

    return (
        <SafeAreaView>
            <Text type="title">{name}</Text>
            {isLoading ? (
                <Loading skeletons={10} />
            ) : isError ? (
                <ErrorFound />
            ) : data && data.RecordCount === "0" ? (
                <NotFound />
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

export default Topic;
