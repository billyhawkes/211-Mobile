import { API_KEY_211 } from "@env";
import { useQuery } from "react-query";

const searchKeywordRequest = async (
    keyword: string,
    location: UserLocation | undefined
): Promise<ServiceResponse> => {
    const res = await fetch(
        `https://data.211support.org/api/v2/search?key=${API_KEY_211}`,
        {
            method: "Post",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                Dataset: "on",
                Lang: "en",
                SearchType: "proximity",
                Latitude: 48.461312,
                Longitude: -89.228477,
                Distance: 100,
                Search: "term",
                Term: keyword,
            }),
        }
    );
    const data = await res.json();
    const searchResponse: ServiceResponse = data as ServiceResponse;
    return searchResponse;
};

const searchTopicRequest = async (
    topic: string,
    location: UserLocation | undefined
): Promise<ServiceResponse> => {
    const res = await fetch(
        `https://data.211support.org/api/v2/search?key=${API_KEY_211}`,
        {
            method: "Post",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                Dataset: "on",
                Lang: "en",
                SearchType: "proximity",
                Latitude: 48.461312,
                Longitude: -89.228477,
                Distance: 100,
                Search: "match",
                MatchMode: "taxterm",
                MatchTerms: topic,
            }),
        }
    );
    const data: ServiceResponse = await res.json();
    return data;
};

const useServices = () => {
    const useSearch = (keyword: string, location: UserLocation | undefined) =>
        useQuery(
            ["keyword", keyword],
            () => searchKeywordRequest(keyword, location),
            {
                cacheTime: 0,
                enabled: !!keyword && keyword !== "",
            }
        );

    const useTopic = (topic: string, location: UserLocation | undefined) => {
        return useQuery(
            ["topic", topic],
            () => searchTopicRequest(topic, location),
            {
                cacheTime: 100,
            }
        );
    };

    return { useSearch, useTopic };
};

export default useServices;
