import React from "react";
import { ScrollView, Text } from "react-native";
import globalStyles from "../styles/global";

const Topic = ({ route, navigation }: any) => {
	const { name } = route.params;

	return (
		<ScrollView>
			<Text style={globalStyles.pageTitle}>{name}</Text>
		</ScrollView>
	);
};

export default Topic;
