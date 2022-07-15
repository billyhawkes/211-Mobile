import Button from "@components/ui/Button";
import theme from "@constants/theme";
import React from "react";
import { View, StyleSheet } from "react-native";

const ContactSection = () => {
    return (
        <View style={styles.container}>
            <Button
                primary
                onPress={() => {
                    console.log("TODO");
                }}
                style={{ marginRight: theme.spacing["md"], flex: 1 }}
            >
                CALL 2-1-1
            </Button>
            <Button
                primary
                onPress={() => {
                    console.log("TODO");
                }}
                style={{ flex: 1 }}
            >
                TEXT 2-1-1
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: "relative",
        width: "100%",
        display: "flex",
        flexDirection: "row",
        marginVertical: 15,
        justifyContent: "space-between",
    },
});

export default ContactSection;
