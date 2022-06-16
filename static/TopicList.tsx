import { TopicIcon } from "../components/TopicIcon";
import { FontAwesome5 } from "@expo/vector-icons";

export const TopicList: TopicIcon[] = [
	{ name: "Food", icon: <FontAwesome5 name="bread-slice" size={24} color="black" /> },
	{ name: "Homelessness", icon: <FontAwesome5 name="bed" size={24} color="black" /> },
	{ name: "Housing", icon: <FontAwesome5 name="home" size={25} color="black" /> },
	{
		name: "Mental Health / Addictions",
		icon: <FontAwesome5 name="brain" size={24} color="black" />,
	},
	{ name: "Health Care", icon: <FontAwesome5 name="medkit" size={24} color="black" /> },
	{ name: "Youth", icon: <FontAwesome5 name="child" size={25} color="black" /> },
];
