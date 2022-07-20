import ScreenContainer from "@components/ScreenContainer";
import { FavouritesList } from "@features/favourites";
import React from "react";

const Favourites = () => {
    return (
        <ScreenContainer title="Favourites">
            <FavouritesList />
        </ScreenContainer>
    );
};

export default Favourites;
