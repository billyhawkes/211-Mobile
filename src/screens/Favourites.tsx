import ScreenTitle from "@components/ScreenTitle";
import theme from "@constants/theme";
import { FavouritesList } from "@features/favourites";
import React from "react";
import { SafeAreaView } from "react-native";

const Favourites = () => {
    return (
        <SafeAreaView style={{ paddingHorizontal: theme.spacing.lg }}>
            <ScreenTitle title="Favourites" />
            <FavouritesList />
        </SafeAreaView>
    );
};

export default Favourites;
