import { ScrollView, StyleSheet, Text } from "react-native";
import theme from "../../constants/theme";

type Props = {
	title?: string;
	children: JSX.Element | JSX.Element[];
};

const ScreenContainer = ({ children, title }: Props) => {
	return (
		<ScrollView style={styles.container}>
			{title ? <Text style={[theme.textVariants.lg, styles.title]}>{title}</Text> : null}
			{children}
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: theme.spacing.lg,
		backgroundColor: theme.colors.background,
	},
	title: {
		fontWeight: "bold",
		textAlign: "center",
		marginVertical: 15,
	},
});

export default ScreenContainer;
