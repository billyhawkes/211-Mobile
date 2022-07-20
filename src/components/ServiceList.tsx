import { ScreenProps } from "@features/navigation";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { Service } from "@typesGlobal/service";
import React from "react";

import ServiceItem from "./ServiceItem";

type Props = {
    services: Service[];
};

const ServiceList = ({ services }: Props) => {
    const navigation = useNavigation<DrawerNavigationProp<ScreenProps>>();

    return (
        <>
            {services.map((service) => {
                return (
                    <ServiceItem
                        key={service.id}
                        service={service}
                        onPress={() =>
                            navigation.navigate("Service", {
                                service,
                            })
                        }
                    />
                );
            })}
        </>
    );
};

export default ServiceList;
