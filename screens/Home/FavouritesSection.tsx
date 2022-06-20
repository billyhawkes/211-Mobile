import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import ServiceItem from "../../components/ServiceItem";
import useFavourites from "../../hooks/useFavourites";
import { DrawerParamList } from "../../navigation";
import globalStyles from "../../styles/global";

const FavouritesSection = () => {
	const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();
	const { findFavourites } = useFavourites();
	const { data: favourites, isLoading } = findFavourites;

	return (
		<View>
			<View style={styles.header}>
				<Text style={globalStyles.h3}>Favourites</Text>
				<Pressable
					style={[
						globalStyles.ghostButton,
						{ paddingVertical: 5, paddingHorizontal: 10 },
					]}
					onPress={() => navigation.navigate("Favourites")}
				>
					<Text style={[globalStyles.ghostButtonText, { fontSize: 12 }]}>VIEW MORE</Text>
				</Pressable>
			</View>
			{favourites &&
				favourites
					.slice(0, 2)
					.map((service: any, index: any) => (
						<ServiceItem key={index} service={service} />
					))}
			{isLoading && (
				<View>
					{[0, 1].map((key) => (
						<ServiceItem key={key} service={undefined} />
					))}
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	header: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		flexDirection: "row",
		marginBottom: "20px",
	},
});

export default FavouritesSection;
