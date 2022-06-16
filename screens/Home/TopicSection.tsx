import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import TopicIcon from "../../components/TopicIcon";
import { DrawerParamList } from "../../navigation";
import { TopicList } from "../../static/TopicList";
import globalStyles from "../../styles/global";

const TopicSection = () => {
	const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();
	return (
		<View>
			<View style={styles.header}>
				<Text style={globalStyles.header3}>Topics</Text>
				<Pressable
					style={globalStyles.ghostButton}
					onPress={() => navigation.navigate("Topics")}
				>
					<Text style={globalStyles.ghostButtonText}>VIEW MORE</Text>
				</Pressable>
			</View>
			<View style={styles.topicsContainer}>
				{TopicList.map((topic) => (
					<TopicIcon {...topic} />
				))}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	topicsContainer: {
		display: "flex",
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between",
	},
	header: {
		display: "flex",
		justifyContent: "space-between",
		flexDirection: "row",
		marginBottom: "20px",
	},
});

export default TopicSection;
