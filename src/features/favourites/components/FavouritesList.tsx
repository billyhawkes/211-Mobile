import ServiceItem from "@components/ServiceItem";
import theme from "@constants/theme";
import { ScreenProps } from "@features/navigation";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, StyleSheet } from "react-native";

import EmptyImage from "../assets/empty-undraw.svg";
import useFavourites from "../hooks/useFavourites";

type Props = {
    limit?: number;
};

const FavouritesList = ({ limit }: Props) => {
    const navigation = useNavigation<DrawerNavigationProp<ScreenProps>>();
    const { useFindFavourites } = useFavourites();
    const { data: favourites } = useFindFavourites;

    return (
        <>
            {favourites?.slice(0, limit).map((service) => (
                <ServiceItem
                    key={service.id}
                    service={service}
                    onPress={() =>
                        navigation.navigate("Service", {
                            service,
                        })
                    }
                />
            )) ?? null}
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
        </>
    );
};

const styles = StyleSheet.create({
    text: { opacity: 0.7, textAlign: "center", marginTop: theme.spacing.lg },
    image: { marginTop: theme.spacing.xl3 },
});

export default FavouritesList;
