import EmptyImage from "@assets/svg/empty-undraw.svg";
import ScreenContainer from "@components/layouts/ScreenContainer";
import ServiceList from "@components/services/ServiceList";
import theme from "@constants/theme";
import useServices from "@hooks/useServices";
import React from "react";
import { Text, StyleSheet } from "react-native";

const Favourites = () => {
    const { useFindFavourites } = useServices();
    const { data: favourites } = useFindFavourites;

    return (
        <ScreenContainer title="Favourites">
            <ServiceList services={favourites ?? []} />
            <>
                {favourites && favourites.length === 0 ? (
                    <>
                        <EmptyImage
                            width="100%"
                            height={120}
                            style={styles.image}
                        />
                        <Text style={[theme.textVariants.md, styles.text]}>
                            No favourites yet!
                        </Text>
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
