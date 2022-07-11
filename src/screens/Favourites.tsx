import React from "react";
import { ScrollView } from "react-native";
import ScreenContainer from "../components/common/ScreenContainer";
import ScreenTitle from "../components/common/ScreenTitle";
import ServiceList from "../components/service/ServiceList";
import useFavourites from "../hooks/useFavourites";

const Favourites = () => {
	const { findFavourites } = useFavourites();
	const { data: favourites } = findFavourites;

	return (
		<ScreenContainer>
			<ScreenTitle name="Favourites" />
			<ServiceList services={favourites || undefined} />
		</ScreenContainer>
	);
};

export default Favourites;
