import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Button from "../../components/common/Button";
import ServiceList from "../../components/service/ServiceList";
import useFavourites from "../../hooks/useFavourites";
import { DrawerParamList } from "../../navigation";
import theme from "../../styles/theme";

const FavouritesSection = () => {
	const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();
	const { findFavourites } = useFavourites();
	const { data: favourites, isLoading } = findFavourites;

	return (
		<View>
			<View style={styles.header}>
				<Text style={theme.textVariants.lg}>Favourites</Text>
				<Button size="sm" onPress={() => navigation.navigate("Favourites")}>
					VIEW MORE
				</Button>
			</View>
			<ServiceList
				services={favourites ? favourites.slice(0, 2) : undefined}
				isLoading={isLoading}
				numItems={2}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	header: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		flexDirection: "row",
		marginBottom: 20,
	},
});

export default FavouritesSection;
