import React from "react";
import { Text, ScrollView, StyleSheet, View } from "react-native";
import theme from "../styles/theme";

const Service = ({ route }: any) => {
	const { service } = route.params;

	return (
		<ScrollView style={{ padding: 15 }}>
			<Text style={[styles.header]}>{service.PublicName}</Text>
			<View style={styles.container}>
				<Text>{service.PhysicalAddressStreet1}</Text>
			</View>
			<Text style={[styles.header]}>Description</Text>
			<View style={styles.container}>
				<Text>{service.Description}</Text>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		width: "100%",
		borderWidth: 1,
		borderColor: "#ccc",
		borderTopWidth: 0,
		padding: 15,
		marginBottom: 15,
		borderBottomRightRadius: 5,
		borderBottomLeftRadius: 5,
	},
	header: {
		width: "100%",
		paddingVertical: 10,
		paddingHorizontal: 15,
		backgroundColor: theme.colors.primary,
		color: "#ffffff",
		fontWeight: "bold",
		borderTopLeftRadius: 5,
		borderTopRightRadius: 5,
	},
});

export default Service;
