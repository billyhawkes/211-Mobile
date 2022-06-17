import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { DrawerParamList } from "../../navigation";
import globalStyles from "../../styles/global";

const FavouritesSection = () => {
	const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();
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
