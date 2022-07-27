import theme from "@constants/theme";
import { FontAwesome5 } from "@expo/vector-icons";
import {
    createDrawerNavigator,
    DrawerNavigationOptions,
    DrawerNavigationProp,
} from "@react-navigation/drawer";
import {
    DefaultTheme,
    NavigationContainer,
    RouteProp,
} from "@react-navigation/native";
import Favourites from "@screens/Favourites";
import Home from "@screens/Home";
import Search from "@screens/Search";
import Service from "@screens/Service";
import Topic from "@screens/Topic";
import Topics from "@screens/Topics";
import { ServiceRecord } from "@typesGlobal/service";
import React from "react";
import { Pressable } from "react-native";

export const mainOptions:
    | DrawerNavigationOptions
    | ((props: {
          route: RouteProp<ScreenProps, keyof ScreenProps>;
          navigation: DrawerNavigationProp<
              ScreenProps,
              keyof ScreenProps,
              undefined
          >;
      }) => DrawerNavigationOptions)
    | undefined = ({ navigation }) => ({
    headerTitle: "",
    headerLeft: () => (
        <Pressable onPress={() => navigation.toggleDrawer()}>
            <FontAwesome5
                name="bars"
                size={24}
                color="black"
                style={{ padding: 12 }}
            />
        </Pressable>
    ),
    headerRight: () => (
        <Pressable onPress={() => navigation.navigate("Search")}>
            <FontAwesome5
                name="search"
                size={24}
                color="black"
                style={{ padding: 12 }}
            />
        </Pressable>
    ),
    drawerActiveTintColor: "#ffffff",
    drawerActiveBackgroundColor: theme.colors.primary,
});

export const pageOptions:
    | DrawerNavigationOptions
    | ((props: {
          route: RouteProp<ScreenProps, keyof ScreenProps>;
          navigation: DrawerNavigationProp<
              ScreenProps,
              keyof ScreenProps,
              undefined
          >;
      }) => DrawerNavigationOptions)
    | undefined = ({ navigation }) => ({
    headerTitle: "",
    headerLeft: () => (
        <Pressable onPress={() => navigation.goBack()}>
            <FontAwesome5
                name="angle-left"
                size={30}
                color="black"
                style={{ padding: 12 }}
            />
        </Pressable>
    ),
});

export type ScreenProps = {
    Home: undefined;
    Topics: undefined;
    Search: undefined;
    Favourites: undefined;
    Topic: {
        name: string;
    };
    Service: {
        service: ServiceRecord;
    };
};

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
