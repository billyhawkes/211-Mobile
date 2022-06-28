import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation, useQuery, useQueryClient } from "react-query";

const loadFavouritesQuery = async () => {
	const jsonValue = await AsyncStorage.getItem("favourites");
	return jsonValue != null ? JSON.parse(jsonValue) : [];
};

const addFavouriteMutation = async (service: any) => {
	const jsonValue = await AsyncStorage.getItem("favourites");
	const favourites = jsonValue != null ? JSON.parse(jsonValue) : [];
	const newFavourites = JSON.stringify([...favourites, service]);
	await AsyncStorage.setItem("favourites", newFavourites);
	return service;
};

const removeFavouriteMutation = async (service: any) => {
	const jsonValue = await AsyncStorage.getItem("favourites");
	const favourites = jsonValue != null ? JSON.parse(jsonValue) : [];
	const newFavourites = JSON.stringify(favourites.filter((s: any) => s.id !== service.id));
	await AsyncStorage.setItem("favourites", newFavourites);
	return service;
};

const useFavourites = () => {
	const queryClient = useQueryClient();

	const findFavourites = useQuery("favourites", loadFavouritesQuery);

	const addFavourite = useMutation(addFavouriteMutation, {
		onSuccess: (service) => {
			queryClient.setQueryData("favourites", (currentFavourites: any) => [
				service,
				...currentFavourites,
			]);
		},
	});

	const removeFavourite = useMutation(removeFavouriteMutation, {
		onSuccess: (removedService) => {
			queryClient.setQueryData("favourites", (currentFavourites: any) =>
				currentFavourites.filter((service: any) => service.id !== removedService.id)
			);
		},
	});

	return { findFavourites, addFavourite, removeFavourite };
};

export default useFavourites;