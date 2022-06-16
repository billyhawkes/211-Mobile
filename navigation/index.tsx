import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import Home from "../screens/Home";
import Topics from "../screens/Topics";
import Search from "../screens/Search";
import { mainOptions, pageOptions } from "./ScreenOptions";
import Topic from "../screens/Topic";

export type DrawerParamList = {
	Home: undefined;
	Topics: undefined;
	Search: undefined;
	Topic: {
		name: string;
	};
};

const Drawer = createDrawerNavigator<DrawerParamList>();

const Navigation = () => {
	return (
		<NavigationContainer>
			<Drawer.Navigator useLegacyImplementation initialRouteName="Home">
				<Drawer.Group screenOptions={mainOptions}>
					<Drawer.Screen name="Home" component={Home} />
					<Drawer.Screen name="Topics" component={Topics} />
					<Drawer.Screen name="Search" component={Search} />
				</Drawer.Group>
				<Drawer.Group screenOptions={pageOptions}>
					<Drawer.Screen name="Topic" component={Topic} />
				</Drawer.Group>
			</Drawer.Navigator>
		</NavigationContainer>
	);
};

export default Navigation;
