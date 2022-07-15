import ServiceItem from "@components/service/ServiceItem";
import useFavourites from "@hooks/useFavourites";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import React from "react";

type Props = {
    services: Service[];
};

const ServiceList = ({ services }: Props) => {
    const { useFindFavourites, useAddFavourite, useRemoveFavourite } =
        useFavourites();
    const { data: favourites } = useFindFavourites;
    const navigation = useNavigation<DrawerNavigationProp<ScreenParameters>>();

    return (
        <>
            {services.map((service) => (
                <ServiceItem
                    key={service.id}
                    service={service}
                    starred={
                        favourites
                            ? !!favourites.find(
                                  (favourite: Service) =>
                                      favourite.id === service.id
                              )
                            : false
                    }
                    onPress={() => navigation.navigate("Service", { service })}
                    onPressStar={(starred) =>
                        starred
                            ? useRemoveFavourite.mutate(service)
                            : useAddFavourite.mutate(service)
                    }
                />
            ))}
        </>
    );
};

export default ServiceList;
