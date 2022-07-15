import React from "react";
import { View, Text } from "react-native";

import styles from "./styles";

type Props = {
    title: string;
    text: string;
};

const InfoSection = ({ title, text }: Props) => {
    return (
        <>
            <Text style={[styles.header]}>{title}</Text>
            <View style={styles.outerContainer}>
                <Text>{text}</Text>
            </View>
        </>
    );
};

export default InfoSection;
