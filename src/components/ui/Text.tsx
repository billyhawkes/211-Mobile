import theme, { Theme } from "@constants/theme";
import React from "react";
import { StyleProp, Text as RNText, TextStyle } from "react-native";

type Props = {
    type?: keyof Theme["textVariants"];
    children: React.ReactNode;
    numberOfLines?: number;
    style?: StyleProp<TextStyle>;
    onPress?: () => void;
};

const Text = ({
    type = "default",
    children,
    numberOfLines,
    style,
    onPress,
}: Props) => {
    const textStyle = [theme.textVariants[type], style];
    return (
        <RNText
            style={textStyle}
            numberOfLines={numberOfLines}
            onPress={onPress}
        >
            {children}
        </RNText>
    );
};

export default Text;
