import Button from "@components/ui/Button";
import theme from "@constants/theme";
import useLinkOut from "@hooks/useLinkOut";
import React from "react";
import { View, StyleSheet } from "react-native";

const ContactSection = () => {
    const { call, email } = useLinkOut();
    return (
        <View style={styles.container}>
            <Button
                primary
                onPress={() => call()}
                style={{ marginRight: theme.spacing["md"], flex: 1 }}
            >
                CALL US
            </Button>
            <Button primary onPress={() => email()} style={{ flex: 1 }}>
                EMAIL US
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
