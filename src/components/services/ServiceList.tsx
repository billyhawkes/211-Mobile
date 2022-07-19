import ServiceItem from "@components/services/ServiceItem";
import useServices, { Service } from "@hooks/useServices";
import { ScreenParameters } from "@navigation/ScreenOptions";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import React from "react";

type Props = {
    services: Service[];
};

const ServiceList = ({ services }: Props) => {
    const { useAddFavourite, useRemoveFavourite, isFavourite } = useServices();
    const navigation = useNavigation<DrawerNavigationProp<ScreenParameters>>();

    return (
        <>
            {services.map((service) => {
                const favourite = isFavourite(service.id);
                return (
                    <ServiceItem
                        key={service.id}
                        service={service}
                        starred={favourite}
                        onPress={() =>
                            navigation.navigate("Service", {
                                service,
                            })
                        }
                        onPressStar={(starred) =>
                            starred
                                ? useRemoveFavourite.mutate(service)
                                : useAddFavourite.mutate(service)
                        }
                    />
                );
            })}
        </>
    );
};

export default ServiceList;
