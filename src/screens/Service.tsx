import React from "react";
import { Text, ScrollView, View } from "react-native";
import globalStyles from "../styles/global";

const Service = ({ route }: any) => {
	const { service } = route.params;

	return (
		<View>
			<Text style={[globalStyles.p, { fontWeight: "bold" }]} numberOfLines={1}>
				{service.PublicName}
			</Text>
			<Text style={[globalStyles.p, { opacity: 0.7, fontSize: 12, marginTop: "10px" }]}>
				{service.PhysicalAddressStreet1}
			</Text>
		</View>
	);
};

export default Service;
