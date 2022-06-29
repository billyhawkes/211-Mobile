import React from "react";
import { ScrollView, Text, View, StyleSheet } from "react-native";
import TopicIcon from "../components/TopicIcon";
import { TopicList } from "../assets/data/TopicList";
import ScreenTitle from "../components/common/ScreenTitle";

const Topics = () => {
	return (
		<ScrollView>
			<ScreenTitle name="Topics" />
			<View style={styles.container}>
				{TopicList.map((topic, index) => (
					<TopicIcon key={index} {...topic} />
				))}
				<View style={{ width: "30%" }} />
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 15,
		display: "flex",
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between",
	},
});

export default Topics;
