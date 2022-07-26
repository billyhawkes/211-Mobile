import { API_URL } from "@env";
import { UserLocation } from "@hooks/useLocation";
import { Filters } from "@screens/Search";
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
    { lat, lng }: UserLocation,
    { distance, sortType }: Filters
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
            SortOrder: sortType,
            Distance: distance,
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
    return serviceSearchResponseSchema.parse(data);
};

// HOOKS //
const useSearch = () => {
    const useKeywordSearch = (
        keyword: string,
        location: UserLocation,
        filters: Filters
    ) =>
        useQuery<ServiceResponse, unknown>(
            ["keyword", keyword, location, filters],
            () => searchKeywordRequest(keyword, location, filters),
            {
                cacheTime: 0,
                enabled: !!keyword && keyword !== "",
            }
        );

    const useTopicSearch = (topic: string, location: UserLocation) => {
        return useQuery<ServiceResponse, unknown>(
            ["topic", topic, location],
            () => searchTopicRequest(topic, location)
        );
    };

    return {
        useKeywordSearch,
        useTopicSearch,
    };
};

export default useSearch;
