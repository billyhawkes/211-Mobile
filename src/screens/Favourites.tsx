import React from "react";
import { Text, StyleSheet, View } from "react-native";
import ScreenContainer from "@/components/layouts/ScreenContainer";
import EmptyImage from "@/assets/svg/empty-undraw.svg";
import ServiceList from "@/components/service/ServiceList";
import useFavourites from "@/hooks/useFavourites";
import theme from "@/constants/theme";

const Favourites = () => {
	const { findFavourites } = useFavourites();
	const { data: favourites } = findFavourites;

	return (
		<ScreenContainer title="Favourites">
			<ServiceList services={favourites || undefined} />
			<>
				{favourites && favourites.length === 0 ? (
					<>
						<EmptyImage width="100%" height={120} style={styles.image} />
						<Text style={[theme.textVariants.md, styles.text]}>No favourites yet!</Text>
					</>
				) : null}
			</>
		</ScreenContainer>
	);
};

const styles = StyleSheet.create({
	text: { opacity: 0.7, textAlign: "center", marginTop: theme.spacing.lg },
	image: { marginTop: theme.spacing.xl3 },
});
export default Favourites;
