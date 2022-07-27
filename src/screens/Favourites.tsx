import ServiceItem from "@components/ServiceItem";
import { Empty, ErrorFound, Loading } from "@components/ServiceState";
import Text from "@components/ui/Text";
import theme from "@constants/theme";
import useFavourites from "@hooks/useFavourites";
import React from "react";
import { SafeAreaView } from "react-native";

const Favourites = () => {
    const { useFindFavourites } = useFavourites();
    const { data: favourites, isLoading, isError } = useFindFavourites;

    return (
        <SafeAreaView style={{ paddingHorizontal: theme.spacing.lg }}>
            <Text type="title">Favourites</Text>
            {isLoading ? (
                <Loading skeletons={2} />
            ) : isError ? (
                <ErrorFound />
            ) : favourites && favourites.length === 0 ? (
                <Empty title="No favourites yet!" />
            ) : null}
            {favourites
                ? favourites.map((service) => (
                      <ServiceItem key={service.id} service={service} />
                  ))
                : null}
        </SafeAreaView>
    );
};

export default Favourites;
