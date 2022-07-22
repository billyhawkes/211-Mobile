import theme from "@constants/theme";
import { ScreenProps } from "@features/navigation";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { Service } from "@typesGlobal/service";
import React from "react";
import { ListRenderItem } from "react-native";
import { FlatList } from "react-native-gesture-handler";

import ServiceItem from "./ServiceItem";

type Props = {
    services: Service[];
};

const ServiceList = ({ services }: Props) => {
    const navigation = useNavigation<DrawerNavigationProp<ScreenProps>>();

    const renderItem: ListRenderItem<Service> = ({ item: service }) => (
        <ServiceItem
            service={service}
            onPress={() =>
                navigation.navigate("Service", {
                    service,
                })
            }
        />
    );

    return (
        <FlatList
            style={{ paddingHorizontal: theme.spacing.lg }}
            data={services}
            renderItem={renderItem}
        />
    );
};

export default ServiceList;
