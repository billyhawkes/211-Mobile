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
	{
		name: "Abuse / Assault",
		icon: <FontAwesome5 name="exclamation-triangle" size={25} color={colors.primary} />,
	},
	{
		name: "Audience-Specific",
		icon: <FontAwesome5 name="user-friends" size={25} color={colors.primary} />,
	},
	{
		name: "Child / Family Services",
		icon: <FontAwesome5 name="child" size={25} color={colors.primary} />,
	},
	{
		name: "Community Programs",
		icon: <FontAwesome5 name="book-reader" size={25} color={colors.primary} />,
	},
	{
		name: "Emergency / Crisis",
		icon: <FontAwesome5 name="ambulance" size={25} color={colors.primary} />,
	},
	{
		name: "Employment",
		icon: <FontAwesome5 name="money-bill" size={25} color={colors.primary} />,
	},
	{
		name: "Government / Legal",
		icon: <FontAwesome5 name="balance-scale" size={25} color={colors.primary} />,
	},
	{
		name: "Income Support",
		icon: <FontAwesome5 name="life-ring" size={25} color={colors.primary} />,
	},
	{
		name: "Newcomers",
		icon: <FontAwesome5 name="plane-arrival" size={25} color={colors.primary} />,
	},
	{ name: "Older Adults", icon: <FontAwesome5 name="heart" size={25} color={colors.primary} /> },
	{
		name: "Transportation",
		icon: <FontAwesome5 name="subway" size={25} color={colors.primary} />,
	},
];
