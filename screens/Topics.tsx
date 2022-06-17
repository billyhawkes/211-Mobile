import React from "react";
import { ScrollView, Text, View, StyleSheet } from "react-native";
import TopicIcon from "../components/TopicIcon";
import { TopicList } from "../static/TopicList";
import globalStyles from "../styles/global";

const Topics = () => {
	return (
		<ScrollView>
			<Text style={globalStyles.pageTitle}>Topics</Text>
			<View style={styles.container}>
				{TopicList.map((topic) => (
					<TopicIcon {...topic} />
				))}
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: "15px",
		display: "flex",
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between",
	},
});

export default Topics;
