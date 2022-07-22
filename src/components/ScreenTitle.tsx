import theme from "@constants/theme";
import React from "react";
import { StyleSheet, Text } from "react-native";

type Props = {
    title: string;
};

const ScreenTitle = ({ title }: Props) => {
    return <Text style={[theme.textVariants.lg, styles.title]}>{title}</Text>;
};

const styles = StyleSheet.create({
    title: {
        fontWeight: "bold",
        textAlign: "center",
        marginVertical: 15,
    },
});

export default ScreenTitle;
