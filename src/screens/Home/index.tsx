import theme from "@constants/theme";
import React from "react";
import { ScrollView } from "react-native";

import ContactSection from "./ContactSection";
import FavouritesSection from "./FavouritesSection";
import MainImage from "./HomeImage";
import TopicSection from "./TopicSection";

const Home = () => {
    return (
        <ScrollView style={{ paddingHorizontal: theme.spacing.lg }}>
            <MainImage />
            <ContactSection />
            <TopicSection />
            <FavouritesSection />
        </ScrollView>
    );
};

export default Home;
