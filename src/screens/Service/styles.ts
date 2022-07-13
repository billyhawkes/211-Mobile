import { StyleSheet } from "react-native";
import theme from "../../constants/theme";

const styles = StyleSheet.create({
	centerContainer: {
		width: "100%",
		padding: 15,
	},
	outerContainer: {
		width: "100%",
		borderWidth: 1,
		borderColor: "#ccc",
		borderTopWidth: 0,
		padding: 15,
		marginBottom: 15,
		borderBottomRightRadius: 5,
		borderBottomLeftRadius: 5,
	},
	header: {
		width: "100%",
		paddingVertical: 10,
		paddingHorizontal: 15,
		backgroundColor: theme.colors.primary,
		color: "#ffffff",
		fontWeight: "bold",
		borderTopLeftRadius: 5,
		borderTopRightRadius: 5,
	},
	innerBreak: {
		marginHorizontal: -15,
		borderTopWidth: 1,
		borderColor: "#ccc",
	},
	link: {
		color: theme.colors.link,
		textDecorationLine: "underline",
	},
});

export default styles;
