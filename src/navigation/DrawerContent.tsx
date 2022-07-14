import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import React from "react";
import { StyleSheet } from "react-native";

const DrawerContent = (props: any) => {
	return (
		<DrawerContentScrollView {...props}>
			<DrawerItemList {...props} style={styles.container} />
		</DrawerContentScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 15,
	},
});

export default DrawerContent;
