import { StyleSheet, Text, View } from "react-native";
import theme from "../../styles/theme";
type Props = {
	name: string;
};

const ScreenTitle = ({ name }: Props) => {
	return <Text style={[theme.textVariants.lg, styles.text]}>{name}</Text>;
};

const styles = StyleSheet.create({
	text: {
		fontWeight: "bold",
		textAlign: "center",
		marginVertical: 15,
	},
});

export default ScreenTitle;
