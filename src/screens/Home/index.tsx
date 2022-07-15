import ScreenContainer from "@components/layouts/ScreenContainer";
import React from "react";

import ContactSection from "./ContactSection";
import FavouritesSection from "./FavouritesSection";
import MainImage from "./HomeImage";
import TopicSection from "./TopicSection";

const Home = () => {
    return (
        <ScreenContainer>
            <MainImage />
            <ContactSection />
            <TopicSection />
            <FavouritesSection />
        </ScreenContainer>
    );
};

export default Home;
