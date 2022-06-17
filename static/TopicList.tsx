import { TopicIcon } from "../components/TopicIcon";
import { FontAwesome5 } from "@expo/vector-icons";
import colors from "../styles/colors";

export const TopicList: TopicIcon[] = [
	{ name: "Food", icon: <FontAwesome5 name="bread-slice" size={24} color={colors.primary} /> },
	{ name: "Homelessness", icon: <FontAwesome5 name="bed" size={24} color={colors.primary} /> },
	{ name: "Housing", icon: <FontAwesome5 name="home" size={25} color={colors.primary} /> },
	{
		name: "Mental Health",
		icon: <FontAwesome5 name="brain" size={24} color={colors.primary} />,
	},
	{ name: "Health Care", icon: <FontAwesome5 name="medkit" size={24} color={colors.primary} /> },
	{ name: "Youth", icon: <FontAwesome5 name="child" size={25} color={colors.primary} /> },
];
