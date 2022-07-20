import theme from "@constants/theme";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import Favourites from "@screens/Favourites";
import Home from "@screens/Home";
import Search from "@screens/Search";
import Service from "@screens/Service";
import Topic from "@screens/Topic";
import Topics from "@screens/Topics";
import React from "react";

import { mainOptions, pageOptions } from "../config/ScreenOptions";
import { ScreenProps } from "../types/ScreenProps";
import DrawerContent from "./DrawerContent";

export const Drawer = createDrawerNavigator<ScreenProps>();

const Navigation = () => {
    return (
        <NavigationContainer
            theme={{
                ...DefaultTheme,
                colors: {
                    ...DefaultTheme.colors,
                    primary: theme.colors.primary,
                    background: theme.colors.background,
                },
            }}
        >
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
