import { FontAwesome5 } from "@expo/vector-icons";
import { DrawerNavigationOptions } from "@react-navigation/drawer";
import { RouteProp } from "@react-navigation/native";
import { Pressable } from "react-native";
import { DrawerParamList } from ".";
import colors from "../styles/colors";

export const mainOptions:
	| DrawerNavigationOptions
	| ((props: {
			route: RouteProp<DrawerParamList, keyof DrawerParamList>;
			navigation: any;
	  }) => DrawerNavigationOptions)
	| undefined = ({ navigation }) => ({
	headerTitle: "",
	headerLeft: () => (
		<Pressable onPress={() => navigation.toggleDrawer()}>
			<FontAwesome5 name="bars" size={24} color="black" style={{ padding: 12 }} />
		</Pressable>
	),
	headerRight: () => (
		<Pressable onPress={() => navigation.navigate("Search")}>
			<FontAwesome5 name="search" size={24} color="black" style={{ padding: 12 }} />
		</Pressable>
	),
	drawerActiveTintColor: "#ffffff",
	drawerActiveBackgroundColor: colors.primary,
});

export const pageOptions:
	| DrawerNavigationOptions
	| ((props: {
			route: RouteProp<DrawerParamList, keyof DrawerParamList>;
			navigation: any;
	  }) => DrawerNavigationOptions)
	| undefined = ({ navigation }) => ({
	headerTitle: "",
	headerLeft: () => (
		<Pressable onPress={() => navigation.goBack()}>
			<FontAwesome5 name="angle-left" size={30} color="black" style={{ padding: 12 }} />
		</Pressable>
	),
});
