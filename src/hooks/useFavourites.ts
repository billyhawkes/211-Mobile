import AsyncStorage from "@react-native-async-storage/async-storage";
import { ServiceRecord, ServiceSchema } from "@typesGlobal/service";
import { useMutation, useQuery, useQueryClient } from "react-query";

const getFavourites = async (): Promise<ServiceRecord[]> => {
    const json = await AsyncStorage.getItem("favourites");
    const jsonValue: unknown = json != null ? JSON.parse(json) : [];
    return ServiceSchema.array().parse(jsonValue);
};

const addFavourite = async (service: ServiceRecord) => {
    const favourites = await getFavourites();
    const newFavourites = JSON.stringify([...favourites, service]);
    await AsyncStorage.setItem("favourites", newFavourites);
    return service;
};

const removeFavourite = async (service: ServiceRecord) => {
    const favourites = await getFavourites();
    const newFavourites = JSON.stringify(
        favourites.filter((s: ServiceRecord) => s.id !== service.id)
    );
    await AsyncStorage.setItem("favourites", newFavourites);
    return service;
};

const useFavourites = () => {
    const queryClient = useQueryClient();

    const useFindFavourites = useQuery("favourites", getFavourites);

    const useAddFavourite = useMutation(addFavourite, {
        onSuccess: (service) => {
            queryClient.setQueryData<ServiceRecord[]>(
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
            queryClient.setQueryData<ServiceRecord[]>(
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

    const isFavourite = (id: number) => {
        const favourites =
            queryClient.getQueryData<ServiceRecord[]>("favourites");
        return favourites
            ? !!favourites.find(
                  (favourite: ServiceRecord) => favourite.id === id
              )
            : false;
    };

    return {
        useFindFavourites,
        useAddFavourite,
        useRemoveFavourite,
        isFavourite,
    };
};

export default useFavourites;
