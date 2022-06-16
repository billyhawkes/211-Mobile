import React from "react";
import { ScrollView, Text } from "react-native";
import TopicIcon from "../components/TopicIcon";
import { TopicList } from "../static/TopicList";

const Topics = () => {
	return (
		<ScrollView>
			<Text>Topics</Text>
			{TopicList.map((topic) => (
				<TopicIcon {...topic} />
			))}
		</ScrollView>
	);
};

export default Topics;
