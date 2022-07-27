import theme, { Theme } from "@constants/theme";
import React from "react";
import {
    Pressable,
    StyleProp,
    StyleSheet,
    Text,
    ViewStyle,
} from "react-native";

type Props = {
    onPress: () => void;
    primary?: boolean;
    size?: keyof Theme["spacing"];
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
};

const Button = ({
    onPress,
    children,
    primary = false,
    size = "md",
    style,
}: Props) => {
    const container = [
        styles.container,
        primary ? styles.primaryContainer : styles.ghostContainer,
        {
            paddingHorizontal: theme.spacing[size] * 2,
            paddingVertical: theme.spacing[size],
        },
        style,
    ];
    const text = [
        styles.text,
        primary ? styles.primaryText : styles.ghostText,
        theme.textVariants["default"],
    ];

    return (
        <Pressable style={container} onPress={onPress}>
            <Text style={text}>{children}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 5,
    },
    primaryContainer: {
        backgroundColor: theme.colors.primary,
    },
    ghostContainer: {
        borderColor: theme.colors.primary,
        borderWidth: 1,
    },
    text: {
        textAlign: "center",
        fontWeight: "bold",
        letterSpacing: 2,
    },
    primaryText: {
        color: "#ffffff",
    },
    ghostText: {
        color: theme.colors.primary,
    },
});

export default Button;
