import Button from "@components/Button";
import theme from "@constants/theme";
import { FavouritesList } from "@features/favourites";
import { ScreenProps } from "@features/navigation";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const FavouritesSection = () => {
    const navigation = useNavigation<DrawerNavigationProp<ScreenProps>>();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={theme.textVariants.lg}>Favourites</Text>
                <Button
                    size="sm"
                    onPress={() => navigation.navigate("Favourites")}
                >
                    VIEW MORE
                </Button>
            </View>
            <FavouritesList limit={2} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: theme.spacing.lg,
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        marginBottom: theme.spacing.lg,
    },
});

export default FavouritesSection;
