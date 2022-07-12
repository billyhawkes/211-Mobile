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
import DrawerContent from "./DrawerContent";

export type DrawerParamList = {
	Home: undefined;
	Topics: undefined;
	Search: undefined;
	Favourites: undefined;
	Topic: {
		name: string;
	};
	Service: {
		service: Service;
	};
};

const Drawer = createDrawerNavigator<DrawerParamList>();

const Navigation = () => {
	return (
		<NavigationContainer>
			<Drawer.Navigator
				drawerContent={(props) => <DrawerContent {...props} />}
				useLegacyImplementation
				initialRouteName="Home"
				backBehavior="history"
			>
				<Drawer.Group screenOptions={mainOptions}>
					<Drawer.Screen name="Home" component={Home} />
				</Drawer.Group>
				<Drawer.Group screenOptions={pageOptions}>
					<Drawer.Screen name="Topics" component={Topics} />
					<Drawer.Screen name="Search" component={Search} />
					<Drawer.Screen name="Favourites" component={Favourites} />
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
