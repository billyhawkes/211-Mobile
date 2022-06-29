import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import TopicIcon from "../../components/TopicIcon";
import { TopicList } from "../../assets/data/TopicList";
import { DrawerParamList } from "../../navigation";
import Button from "../../components/common/Button";
import theme from "../../styles/theme";

const TopicSection = () => {
	const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();
	return (
		<View>
			<View style={styles.header}>
				<Text style={theme.textVariants.lg}>Topics</Text>
				<Button size="sm" onPress={() => navigation.navigate("Topics")}>
					VIEW MORE
				</Button>
			</View>
			<View style={styles.topicsContainer}>
				{TopicList.slice(0, 6).map((topic, index) => (
					<TopicIcon key={index} {...topic} />
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
		alignItems: "center",
		flexDirection: "row",
		marginBottom: 20,
	},
});

export default TopicSection;
