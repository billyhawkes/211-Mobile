import { Pressable, StyleSheet, Text } from "react-native";
import colors from "../../styles/colors";

type Props = {
	onPress: () => any;
	children: JSX.Element;
	primary: boolean;
};

const Button = ({ onPress, children, primary }: Props) => {
	return (
		<Pressable
			style={[styles.container, primary ? styles.primaryContainer : styles.ghostContainer]}
			onPress={onPress}
		>
			<Text style={[styles.text, primary ? styles.primaryText : styles.ghostText]}>
				{children}
			</Text>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	container: {
		borderRadius: 5,
		paddingHorizontal: "15px",
		paddingVertical: "10px",
		textAlign: "center",
	},
	primaryContainer: {
		backgroundColor: colors.primary,
	},
	ghostContainer: {
		backgroundColor: colors.background,
		borderColor: colors.primary,
		borderWidth: 2,
	},
	text: {
		fontWeight: "bold",
		letterSpacing: 2,
	},
	primaryText: {
		color: "#ffffff",
	},
	ghostText: {
		color: colors.primary,
	},
});

export default Button;
