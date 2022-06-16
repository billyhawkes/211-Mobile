import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import globalStyles from "../../styles/global";

const ContactSection = () => {
	return (
		<View style={styles.container}>
			<TouchableOpacity style={[globalStyles.button, { flexGrow: 1, marginRight: "15px" }]}>
				<Text style={globalStyles.buttonText}>CALL 2-1-1</Text>
			</TouchableOpacity>
			<TouchableOpacity style={[globalStyles.button, { flexGrow: 1 }]}>
				<Text style={globalStyles.buttonText}>TEXT 2-1-1</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: "100%",
		display: "flex",
		flexDirection: "row",
		marginVertical: "15px",
	},
});

export default ContactSection;
