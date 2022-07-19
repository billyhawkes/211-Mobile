import theme from "@constants/theme";
import React from "react";
import { Pressable, View, Text, StyleSheet } from "react-native";

import serviceStyles from "./styles";

type Props = {
    link: string;
    title?: string;
    icon: JSX.Element;
    hr?: boolean;
    onPress: () => void;
};

const LinkSection = ({ link, title, icon, hr, onPress }: Props) => {
    return (
        <>
            {hr ? <View style={serviceStyles.innerBreak} /> : null}
            <Pressable style={[styles.container]} onPress={onPress}>
                <View style={{ marginRight: theme.spacing.md }}>{icon}</View>
                {title ? (
                    <Text style={{ fontWeight: "bold" }}>{title}:</Text>
                ) : null}
                <Text
                    style={[serviceStyles.link, { marginLeft: 4 }]}
                    numberOfLines={1}
                >
                    {link}
                </Text>
            </Pressable>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 15,
    },
});

export default LinkSection;
