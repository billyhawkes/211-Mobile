import Button from "@components/ui/Button";
import React from "react";
import { View } from "react-native";

const LanguageToggle = () => (
    <View>
        <Button
            onPress={() => {
                console.log("TODO");
            }}
        >
            EN
        </Button>
        <Button
            onPress={() => {
                console.log("TODO");
            }}
        >
            FR
        </Button>
    </View>
);

export default LanguageToggle;
