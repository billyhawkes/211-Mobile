import React from "react";
import { ScrollView } from "react-native";
import ScreenTitle from "../components/common/ScreenTitle";
import ServiceList from "../components/service/ServiceList";
import useFavourites from "../hooks/useFavourites";

const Favourites = () => {
	const { findFavourites } = useFavourites();
	const { data: favourites, isLoading } = findFavourites;

	return (
		<ScrollView style={{ padding: 15 }}>
			<ScreenTitle name="Favourites" />
			<ServiceList services={favourites || undefined} isLoading={isLoading} numItems={10} />
		</ScrollView>
	);
};

export default Favourites;
