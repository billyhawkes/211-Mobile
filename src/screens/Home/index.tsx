import React from "react";
import { ScrollView, Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import ContactSection from "./ContactSection";
import FavouritesSection from "./FavouritesSection";
import TopicSection from "./TopicSection";
import homeImage from "../../assets/images/home-image-undraw.svg";

const Home = () => {
	return (
		<ScrollView style={styles.container}>
			<Image style={styles.mainImage} source={homeImage} />
			<View style={styles.divider} />
			<ContactSection />
			<TopicSection />
			<FavouritesSection />
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 15,
	},
	divider: {
		width: "100%",
		margin: "auto",
		height: 4,
		backgroundColor: "#2f2e41",
		borderRadius: 3,
	},
	mainImage: {
		width: "100%",
		height: 210,
		resizeMode: "contain",
	},
});

export default Home;
