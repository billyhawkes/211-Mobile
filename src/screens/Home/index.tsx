import React from "react";
import { ScrollView, View, StyleSheet, Image } from "react-native";
import ContactSection from "./ContactSection";
import FavouritesSection from "./FavouritesSection";
import TopicSection from "./TopicSection";
import HomeImage from "../../assets/images/home-image-undraw.svg";

const Home = () => {
	return (
		<ScrollView style={styles.container}>
			<HomeImage width="100%" height={210} style={{ marginTop: 15 }} />
			<View style={styles.divider} />
			<ContactSection />
			<TopicSection />
			<FavouritesSection />
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 15,
	},
	divider: {
		width: "100%",
		margin: "auto",
		height: 4,
		backgroundColor: "#2f2e41",
		borderRadius: 3,
	},
});

export default Home;
