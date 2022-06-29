import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import { DrawerParamList } from "../navigation";
import theme from "../styles/theme";

export type TopicIcon = {
	name: string;
	icon: JSX.Element;
};

const TopicIcon = ({ name, icon }: TopicIcon) => {
	const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();
	return (
		<Pressable style={styles.container} onPress={() => navigation.navigate("Topic", { name })}>
			<View style={styles.icon}>{icon}</View>
			<Text style={[theme.textVariants.md, styles.text]}>{name}</Text>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	container: {
		width: "30%",
		display: "flex",
		alignItems: "center",
		marginBottom: 15,
	},
	icon: {
		display: "flex",
		alignItems: "center",
		padding: 15,
		width: "100%",
		borderWidth: 1,
		borderColor: "#aaa",
		borderRadius: 5,
	},
	text: {
		marginTop: 5,
		textAlign: "center",
	},
});

export default TopicIcon;
