import Text from "@components/ui/Text";
import theme from "@constants/theme";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, StyleSheet, Pressable } from "react-native";

import { ScreenProps } from "./Navigation";

export type TopicIconType = {
    name: string;
    icon: JSX.Element;
};

const TopicIcon = ({ name, icon }: TopicIconType) => {
    const navigation = useNavigation<DrawerNavigationProp<ScreenProps>>();
    return (
        <Pressable
            style={styles.container}
            onPress={() => navigation.navigate("Topic", { name })}
        >
            <View style={styles.icon}>{icon}</View>
            <Text style={{ marginTop: theme.spacing.sm }}>{name}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "30%",
        display: "flex",
        alignItems: "center",
        marginBottom: theme.spacing.lg,
    },
    icon: {
        display: "flex",
        alignItems: "center",
        padding: theme.spacing.lg,
        width: "100%",
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: 5,
    },
});

export default TopicIcon;
