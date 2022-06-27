import { DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import React from "react";
import { Linking, View, StyleSheet, Text } from "react-native";
import LanguageToggle from "../components/LanguageToggle";
import colors from "../styles/colors";

const DrawerContent = (props: any) => {
	return (
		<DrawerContentScrollView {...props}>
			<DrawerItemList {...props} style={styles.container} />
		</DrawerContentScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: "15px",
	},
});

export default DrawerContent;
