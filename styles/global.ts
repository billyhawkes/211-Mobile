import { StyleSheet } from "react-native";
import colors from "./colors";

const globalStyles = StyleSheet.create({
	button: {
		backgroundColor: colors.primary,
		borderRadius: 5,
		paddingHorizontal: "15px",
		paddingVertical: "10px",
		textAlign: "center",
	},
	buttonText: {
		color: "#ffffff",
		fontWeight: "bold",
		letterSpacing: 1,
	},
	ghostButton: {
		backgroundColor: "#ffffff",
		borderColor: colors.primary,
		borderWidth: 1,
		borderRadius: 5,
		paddingHorizontal: "15px",
		paddingVertical: "10px",
		textAlign: "center",
	},
	ghostButtonText: {
		color: colors.primary,
		fontWeight: "bold",
		letterSpacing: 1,
	},
	p: {
		fontFamily: "Lato_500Regular, Helvetica",
		fontSize: 20,
	},
	h3: {
		fontFamily: "Lato_500Regular, Helvetica",
		fontSize: 20,
		fontWeight: "bold",
	},
	pageTitle: {
		fontFamily: "Lato_500Regular, Helvetica",
		fontSize: 20,
		fontWeight: "bold",
		textAlign: "center",
		marginVertical: "15px",
	},
});

export default globalStyles;
