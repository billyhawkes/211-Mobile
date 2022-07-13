import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Button from "../../components/ui/Button";
import ServiceList from "../../components/service/ServiceList";
import useFavourites from "../../hooks/useFavourites";
import { DrawerParamList } from "../../navigation";
import theme from "../../constants/theme";

const FavouritesSection = () => {
	const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();
	const { findFavourites } = useFavourites();
	const { data: favourites } = findFavourites;
	const [showFavourites, setShowFavourites] = useState(false);

	useEffect(() => {
		if (favourites && favourites.length > 0) {
			setShowFavourites(true);
		} else {
			setShowFavourites(false);
		}
	}, [favourites]);

	if (!showFavourites) return <></>;

	return (
		<View>
			<View style={styles.header}>
				<Text style={theme.textVariants.lg}>Favourites</Text>
				<Button size="sm" onPress={() => navigation.navigate("Favourites")}>
					VIEW MORE
				</Button>
			</View>
			{favourites ? <ServiceList services={favourites.slice(0, 2)} /> : null}
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
