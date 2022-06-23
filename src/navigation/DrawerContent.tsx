import { DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import React from "react";
import { Linking, View, StyleSheet, Text } from "react-native";
import LanguageToggle from "../components/LanguageToggle";
import colors from "../styles/colors";

const DrawerContent = (props: any) => {
	return (
		<DrawerContentScrollView {...props}>
			<View style={styles.logo}>
				<Text style={styles.logoText}>2-1-1</Text>
			</View>
			<DrawerItemList {...props} style={styles.container} />
		</DrawerContentScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: "15px",
	},
	logo: {
		width: "35%",
		backgroundColor: colors.primary,
		padding: "15px",
		margin: "10px",
		borderRadius: 5,
		textAlign: "center",
	},
	logoText: {
		color: "#ffffff",
		fontWeight: "bold",
		fontSize: 20,
		letterSpacing: 2,
	},
});

export default DrawerContent;
