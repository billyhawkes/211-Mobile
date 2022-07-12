import React from "react";
import { Text, StyleSheet, View, Pressable } from "react-native";
import ScreenContainer from "../components/layouts/ScreenContainer";
import { FontAwesome5 } from "@expo/vector-icons";
import theme from "../styles/theme";
import { DrawerParamList } from "../navigation";
import { DrawerScreenProps } from "@react-navigation/drawer";
import * as Linking from "expo-linking";

const Service = ({ route }: DrawerScreenProps<DrawerParamList, "Service">) => {
	const {
		service: {
			PublicName,
			PhysicalAddressPostalCode,
			PhysicalAddressStreet1,
			PhysicalAddressCity,
			PhysicalAddressProvince,
			Description,
		},
	} = route.params;

	const linkToMap = () => {
		const url = `https://www.google.com/maps/search/?api=1&query=${PhysicalAddressPostalCode.slice(
			0,
			3
		)}+${PhysicalAddressPostalCode.slice(-3)}`;
		console.log(url);
		Linking.openURL(url);
	};

	return (
		<ScreenContainer>
			<Text style={[styles.header]}>{PublicName}</Text>
			<Pressable
				onPress={linkToMap}
				style={[
					styles.centerContainer,
					{ display: "flex", flexDirection: "row", alignItems: "center" },
				]}
			>
				<FontAwesome5 name="map" size={20} color="black" />
				<Text
					style={[
						{
							marginLeft: theme.spacing.md,
							color: "#0645AD",
							textDecorationLine: "underline",
						},
					]}
				>
					{PhysicalAddressStreet1}
					{", "}
					{PhysicalAddressCity}
					{", "}
					{PhysicalAddressProvince}
				</Text>
			</Pressable>
			<Pressable
				style={[
					styles.centerContainer,
					{ display: "flex", flexDirection: "row", alignItems: "center" },
				]}
			>
				<FontAwesome5 name="phone-alt" size={20} color="black" />
				<Text
					style={[
						{
							marginLeft: theme.spacing.md,
							color: "#0645AD",
							textDecorationLine: "underline",
						},
					]}
				>
					Phone Number
				</Text>
			</Pressable>
			<View style={styles.endContainer}>
				<Text>{PhysicalAddressStreet1}</Text>
			</View>
			<Text style={[styles.header]}>Description</Text>
			<View style={styles.endContainer}>
				<Text>{Description}</Text>
			</View>
		</ScreenContainer>
	);
};

const styles = StyleSheet.create({
	centerContainer: {
		width: "100%",
		borderWidth: 1,
		borderColor: "#ccc",
		borderTopWidth: 0,
		padding: 15,
	},
	endContainer: {
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
