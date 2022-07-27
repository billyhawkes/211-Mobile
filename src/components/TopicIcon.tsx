import theme from "@constants/theme";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";

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
            <Text style={[theme.textVariants.md, styles.text]}>{name}</Text>
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
        borderColor: "#aaa",
        borderRadius: 5,
    },
    text: {
        marginTop: theme.spacing.sm,
        textAlign: "center",
    },
});

export default TopicIcon;
