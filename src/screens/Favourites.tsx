import React from "react";
import { ScrollView, Text, View } from "react-native";
import ScreenTitle from "../components/common/ScreenTitle";
import ServiceItem from "../components/ServiceItem";
import useFavourites from "../hooks/useFavourites";

const Favourites = () => {
	const { findFavourites } = useFavourites();
	const { data: favourites, isLoading } = findFavourites;

	return (
		<ScrollView style={{ padding: 15 }}>
			<ScreenTitle name="Favourites" />
			{favourites &&
				favourites.map((service: any, index: any) => (
					<ServiceItem key={index} service={service} />
				))}
			{isLoading && (
				<View>
					{[0, 1, 2, 3, 4, 5, 6, 7].map((key) => (
						<ServiceItem key={key} service={undefined} />
					))}
				</View>
			)}
		</ScrollView>
	);
};

export default Favourites;
