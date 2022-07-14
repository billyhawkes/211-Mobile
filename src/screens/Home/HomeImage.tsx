import React from "react";
import { View, StyleSheet } from "react-native";
import HImage from "@/assets/svg/home-image-undraw.svg";

const HomeImage = () => {
	return (
		<>
			<HImage width="100%" height={210} style={{ marginTop: 15 }} />
			<View style={styles.underline} />
		</>
	);
};

const styles = StyleSheet.create({
	underline: {
		width: "100%",
		margin: "auto",
		height: 4,
		backgroundColor: "#2f2e41",
		borderRadius: 3,
	},
});

export default HomeImage;
