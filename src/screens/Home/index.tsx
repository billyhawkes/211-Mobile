import React from "react";
import ContactSection from "./ContactSection";
import FavouritesSection from "./FavouritesSection";
import TopicSection from "./TopicSection";
import ScreenContainer from "../../components/common/ScreenContainer";
import MainImage from "./HomeImage";

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
