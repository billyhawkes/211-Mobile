import React from "react";
import { Text, ScrollView, StyleSheet, View } from "react-native";
import colors from "../styles/colors";
import globalStyles from "../styles/global";

const Service = ({ route }: any) => {
	const { service } = route.params;

	return (
		<ScrollView style={{ padding: "15px" }}>
			<Text style={[globalStyles.p, styles.header]}>{service.PublicName}</Text>
			<View style={styles.container}>
				<Text style={globalStyles.p}>{service.PhysicalAddressStreet1}</Text>
			</View>
			<Text style={[globalStyles.p, styles.header]}>Description</Text>
			<View style={styles.container}>
				<Text style={globalStyles.p}>{service.Description}</Text>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		width: "100%",
		boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25);",
		padding: "15px",
		marginBottom: "15px",
		borderBottomRightRadius: 5,
		borderBottomLeftRadius: 5,
	},
	header: {
		width: "100%",
		paddingVertical: "10px",
		paddingHorizontal: "15px",
		backgroundColor: colors.primary,
		color: "#ffffff",
		fontWeight: "bold",
		borderTopLeftRadius: 5,
		borderTopRightRadius: 5,
	},
});

export default Service;
