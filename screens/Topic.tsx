import React from "react";
import { ScrollView, Text } from "react-native";

type Props = { name: string };

const Topic = ({ name }: Props) => {
	return (
		<ScrollView>
			<Text>{name}</Text>
		</ScrollView>
	);
};

export default Topic;
