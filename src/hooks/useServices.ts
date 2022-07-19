import { API_KEY_211 } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation, useQuery, useQueryClient } from "react-query";
import z from "zod";

import { UserLocation } from "./useLocation";

// SERVICE SCHEMA //
const serviceSchema = z.object({
    id: z.number(),
    CurrentId: z.number(),
    ParentId: z.number(),
    Description: z.string(),
    Distance: z.number(),
    Email: z.string().optional(),
    Hours: z.string(),
    Hours2: z.string(),
    Latitude: z.number(),
    Longitude: z.number(),
    MailingAddressCity: z.string(),
    MailingAddressCountry: z.string(),
    MailingAddressPostalCode: z.string(),
    MailingAddressProvince: z.string(),
    MailingAddressStreet1: z.string(),
    MailingAddressStreet2: z.string(),
    MailingAttentionName: z.string(),
    MaxAge: z.string(),
    MinAge: z.string(),
    PhoneNumbers: z
        .object({
            Description: z.string(),
            Name: z.string(),
            Phone: z.string(),
            Type: z.string(),
        })
        .array()
        .optional(),
    PhysicalAddressCity: z.string(),
    PhysicalAddressCountry: z.string(),
    PhysicalAddressPostalCode: z.string(),
    PhysicalAddressProvince: z.string(),
    PhysicalAddressStreet1: z.string(),
    PhysicalAddressStreet2: z.string(),
    PublicName: z.string(),
    RecordOwner: z.string(),
    Score: z.number(),
    ServiceArea: z.string().array(),
    UpdatedOn: z.string(),
    Website: z.string().url().optional(),
});

// SERVICE SEARCH RESPONSE SCHEMA //
const serviceSearchResponseSchema = z.object({
    RecordCount: z.string(),
    Records: serviceSchema.array(),
});

// SCHEMA TYPES //
export type Service = z.infer<typeof serviceSchema>;
type ServiceResponse = z.infer<typeof serviceSearchResponseSchema>;

// SERVICE FUNCTIONS & REQUESTS //
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
    const data: unknown = await res.json();
    return serviceSearchResponseSchema.parse(data);
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
    const data: unknown = await res.json();
    return serviceSearchResponseSchema.parse(data);
};

const getFavourites = async (): Promise<Service[]> => {
    const json = await AsyncStorage.getItem("favourites");
    const jsonValue: unknown = json != null ? JSON.parse(json) : [];
    return serviceSchema.array().parse(jsonValue);
};

const addFavourite = async (service: Service) => {
    const favourites = await getFavourites();
    const newFavourites = JSON.stringify([...favourites, service]);
    await AsyncStorage.setItem("favourites", newFavourites);
    return service;
};

const removeFavourite = async (service: Service) => {
    const favourites = await getFavourites();
    const newFavourites = JSON.stringify(
        favourites.filter((s: Service) => s.id !== service.id)
    );
    await AsyncStorage.setItem("favourites", newFavourites);
    return service;
};

// HOOKS //
const useServices = () => {
    const queryClient = useQueryClient();

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
        return useQuery<ServiceResponse, unknown>(
            ["topic", topic],
            () => searchTopicRequest(topic, location),
            {
                cacheTime: 100,
            }
        );
    };

    const useFindFavourites = useQuery("favourites", getFavourites);

    const useAddFavourite = useMutation(addFavourite, {
        onSuccess: (service) => {
            queryClient.setQueryData<Service[]>(
                "favourites",
                (currentFavourites) =>
                    currentFavourites
                        ? [service, ...currentFavourites]
                        : [service]
            );
        },
    });

    const useRemoveFavourite = useMutation(removeFavourite, {
        onSuccess: (removedService) => {
            queryClient.setQueryData<Service[]>(
                "favourites",
                (currentFavourites) =>
                    currentFavourites
                        ? currentFavourites.filter(
                              (service) => service.id !== removedService.id
                          )
                        : []
            );
        },
    });

    return {
        useKeywordSearch,
        useTopicSearch,
        useFindFavourites,
        useAddFavourite,
        useRemoveFavourite,
    };
};

export default useServices;
