import React from "react";
import { ScrollView, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import ContactSection from "./ContactSection";
import TopicSection from "./TopicSection";

const Home = () => {
	return (
		<ScrollView style={styles.container}>
			<View style={styles.mainImage} />
			<ContactSection />
			<TopicSection />
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: "15px",
	},
	mainImage: {
		backgroundColor: "#aaaaaa",
		width: "100%",
		height: "200px",
	},
});

export default Home;
