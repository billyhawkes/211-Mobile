import { ScrollView, StyleSheet } from "react-native";
import theme from "../../styles/theme";

type Props = {
	children: JSX.Element | JSX.Element[];
};

const ScreenContainer = ({ children }: Props) => {
	return <ScrollView style={styles.container}>{children}</ScrollView>;
};

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: theme.spacing.lg,
		backgroundColor: theme.colors.background,
	},
});

export default ScreenContainer;
