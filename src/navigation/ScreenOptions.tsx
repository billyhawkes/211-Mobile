import theme from "@constants/theme";
import { FontAwesome5 } from "@expo/vector-icons";
import { Service } from "@hooks/useServices";
import {
    DrawerNavigationOptions,
    DrawerNavigationProp,
} from "@react-navigation/drawer";
import { RouteProp } from "@react-navigation/native";
import React from "react";
import { Pressable } from "react-native";

export type ScreenParameters = {
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

export const mainOptions:
    | DrawerNavigationOptions
    | ((props: {
          route: RouteProp<ScreenParameters, keyof ScreenParameters>;
          navigation: DrawerNavigationProp<
              ScreenParameters,
              keyof ScreenParameters,
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
          route: RouteProp<ScreenParameters, keyof ScreenParameters>;
          navigation: DrawerNavigationProp<
              ScreenParameters,
              keyof ScreenParameters,
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
