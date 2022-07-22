import { API_URL } from "@env";
import { UserLocation } from "@hooks/useLocation";
import { ServiceSchema } from "@typesGlobal/service";
import { useQuery } from "react-query";
import z from "zod";

// SERVICE SEARCH RESPONSE SCHEMA //
const serviceSearchResponseSchema = z.object({
    RecordCount: z.string(),
    Records: ServiceSchema.array(),
});

// SCHEMA TYPES //
type ServiceResponse = z.infer<typeof serviceSearchResponseSchema>;

// SERVICE FUNCTIONS & REQUESTS //
const searchKeywordRequest = async (
    keyword: string,
    location: UserLocation | undefined
): Promise<ServiceResponse> => {
    console.log(location);
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
            Latitude: location?.latitude ?? 43.6532,
            Longitude: location?.longitude ?? -79.3832,
            Distance: 100,
            Search: "term",
            PageSize: 1000,
            Term: keyword,
        }),
    });
    const data: unknown = await res.json();
    return serviceSearchResponseSchema.parse(data);
};

const searchTopicRequest = async (
    topic: string,
    location: UserLocation | undefined
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
            Latitude: location?.latitude ?? 43.6532,
            Longitude: location?.longitude ?? -79.3832,
            Distance: 100,
            Search: "match",
            MatchMode: "taxterm",
            PageSize: 1000,
            MatchTerms: topic,
        }),
    });
    const data: unknown = await res.json();
    return serviceSearchResponseSchema.parse(data);
};

// HOOKS //
const useSearch = () => {
    const useKeywordSearch = (
        keyword: string,
        location: UserLocation | undefined
    ) =>
        useQuery<ServiceResponse, unknown>(
            ["keyword", keyword],
            () => searchKeywordRequest(keyword, location),
            {
                cacheTime: 0,
                enabled: !!keyword && keyword !== "",
            }
        );

    const useTopicSearch = (
        topic: string,
        location: UserLocation | undefined
    ) => {
        return useQuery<ServiceResponse, unknown>(["topic", topic], () =>
            searchTopicRequest(topic, location)
        );
    };

    return {
        useKeywordSearch,
        useTopicSearch,
    };
};

export default useSearch;
