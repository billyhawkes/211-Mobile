import Text from "@components/ui/Text";
import theme from "@constants/theme";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { ServiceRecord } from "@typesGlobal/service";
import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated, Pressable } from "react-native";

import { ScreenProps } from "./Navigation";
import StarButton from "./StarButton";

const useSkeleten = () => {
    const opacity = useRef(new Animated.Value(0.3)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(opacity, {
                    toValue: 1,
                    useNativeDriver: false,
                    duration: 500,
                }),
                Animated.timing(opacity, {
                    toValue: 0.3,
                    useNativeDriver: false,
                    duration: 800,
                }),
            ])
        ).start();
    }, [opacity]);

    return { opacity };
};

export const ServiceItemSkeleton = () => {
    const { opacity } = useSkeleten();

    return (
        <View style={styles.skeletonContainer}>
            <Animated.View style={[styles.skeleton, { opacity }]} />
            <Animated.View
                style={[styles.skeleton, { height: 10, width: "40%", opacity }]}
            />
        </View>
    );
};

type Props = {
    service: ServiceRecord;
};

const ServiceItem = ({ service }: Props) => {
    const {
        PublicName,
        PhysicalAddressStreet1,
        PhysicalAddressCity,
        PhysicalAddressProvince,
    } = service;
    const location = `${PhysicalAddressStreet1} ${PhysicalAddressCity} ${PhysicalAddressProvince}`;
    const navigation = useNavigation<DrawerNavigationProp<ScreenProps>>();

    const navigateToServicePage = (service: ServiceRecord) => {
        navigation.navigate("Service", {
            service,
        });
    };

    return (
        <Pressable
            onPress={() => navigateToServicePage(service)}
            style={styles.container}
        >
            <Text numberOfLines={1}>{PublicName}</Text>
            <Text type="paragraph">{location}</Text>
            <StarButton service={service} size={20} />
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: theme.spacing.lg,
        paddingRight: 40,
        marginBottom: theme.spacing.lg,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: theme.colors.border,
        height: 80,
    },
    skeletonContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: theme.spacing.lg,
        marginBottom: theme.spacing.lg,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: theme.colors.border,
        height: 80,
    },
    skeleton: {
        width: "100%",
        height: theme.spacing.lg,
        backgroundColor: "#999",
        borderRadius: 5,
    },
});

export default ServiceItem;
