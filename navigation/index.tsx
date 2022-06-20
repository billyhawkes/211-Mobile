import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import Home from "../screens/Home";
import Topics from "../screens/Topics";
import Search from "../screens/Search";
import { mainOptions, pageOptions } from "./ScreenOptions";
import Topic from "../screens/Topic";
import Favourites from "../screens/Favourites";
import Service from "../screens/Service";

export type DrawerParamList = {
	Home: undefined;
	Topics: undefined;
	Search: undefined;
	Favourites: undefined;
	Topic: {
		name: string;
	};
	Service: {
		service: any;
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
					<Drawer.Screen name="Favourites" component={Favourites} />
				</Drawer.Group>
				<Drawer.Group screenOptions={pageOptions}>
					<Drawer.Screen
						name="Topic"
						component={Topic}
						options={{ drawerItemStyle: { height: 0 } }}
					/>
					<Drawer.Screen
						name="Service"
						component={Service}
						options={{ drawerItemStyle: { height: 0 } }}
					/>
				</Drawer.Group>
			</Drawer.Navigator>
		</NavigationContainer>
	);
};

export default Navigation;
