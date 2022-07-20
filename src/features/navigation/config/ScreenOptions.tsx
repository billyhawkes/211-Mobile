import theme from "@constants/theme";
import { FontAwesome5 } from "@expo/vector-icons";
import {
    DrawerNavigationOptions,
    DrawerNavigationProp,
} from "@react-navigation/drawer";
import { RouteProp } from "@react-navigation/native";
import React from "react";
import { Pressable } from "react-native";

import { ScreenProps } from "../types/ScreenProps";

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
