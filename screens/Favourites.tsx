import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import { ScrollView, Text } from "react-native";
import ServiceItem from "../components/ServiceItem";
import globalStyles from "../styles/global";

const Favourites = () => {
	const [favourites, setFavourites] = useState([]);

	const loadFavourites = async () => {
		try {
			const jsonValue = await AsyncStorage.getItem("favourites");
			if (jsonValue != null) {
				setFavourites(JSON.parse(jsonValue));
			}
		} catch (err) {
			// Error
		}
	};

	useEffect(() => {
		loadFavourites();
	}, []);

	return (
		<ScrollView>
			<Text style={globalStyles.pageTitle}>Favourites</Text>
			{favourites &&
				favourites.map((service: any, index) => (
					<ServiceItem key={index} service={service} />
				))}
		</ScrollView>
	);
};

export default Favourites;
