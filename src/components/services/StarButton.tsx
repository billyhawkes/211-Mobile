import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet } from "react-native";

type Props = {
    starred: boolean;
    size: number;
    onPress: (starred: boolean) => void;
};

const StarButton = ({ starred, size, onPress }: Props) => {
    return (
        <Pressable style={styles.star} onPress={() => onPress(starred)}>
            <FontAwesome
                name={starred ? "star" : "star-o"}
                size={size}
                color={starred ? "#FDCC0D" : "black"}
            />
        </Pressable>
    );
};

const styles = StyleSheet.create({
    star: {
        position: "absolute",
        right: 0,
        top: 0,
        padding: 10,
    },
});

export default StarButton;
