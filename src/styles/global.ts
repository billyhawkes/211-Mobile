import { StyleSheet } from "react-native";
import theme from "./theme";

const globalStyles = StyleSheet.create({
	button: {
		backgroundColor: theme.colors.primary,
		borderRadius: 5,
		paddingHorizontal: 15,
		paddingVertical: 10,
		textAlign: "center",
	},
	buttonText: {
		color: "#ffffff",
		fontWeight: "bold",
		letterSpacing: 1,
	},
	ghostButton: {
		backgroundColor: "#ffffff",
		borderColor: theme.colors.primary,
		borderWidth: 1,
		borderRadius: 5,
		paddingHorizontal: 15,
		paddingVertical: 10,
		textAlign: "center",
	},
	ghostButtonText: {
		color: theme.colors.primary,
		fontWeight: "bold",
		letterSpacing: 1,
	},
	p: {
		fontFamily: "Lato_500Regular, Helvetica",
		fontSize: 14,
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
		marginVertical: 15,
	},
});

export default globalStyles;
