import theme from "@constants/theme";
import useSkeleten from "@hooks/useSkeleten";
import { Service } from "@typesGlobal/service";
import React from "react";
import { View, Text, StyleSheet, Animated, Pressable } from "react-native";

type Props = {
    service: Service;
    onPress: () => void;
};

const ServiceItem = ({ service, onPress }: Props) => {
    const {
        PublicName,
        PhysicalAddressStreet1,
        PhysicalAddressCity,
        PhysicalAddressProvince,
    } = service;
    const location = `${PhysicalAddressStreet1} ${PhysicalAddressCity} ${PhysicalAddressProvince}`;

    return (
        <Pressable onPress={onPress} style={styles.container}>
            <Text style={[{ fontWeight: "bold" }]} numberOfLines={1}>
                {PublicName}
            </Text>
            <Text style={[{ opacity: 0.7, fontSize: 12, marginTop: 10 }]}>
                {location}
            </Text>
        </Pressable>
    );
};

export const ServiceItemSkeleton = () => {
    const { opacity } = useSkeleten();

    return (
        <View style={styles.skeletonContainer}>
            <Animated.View style={[styles.skeleton, { opacity }]} />
            <Animated.View
                style={[
                    styles.skeleton,
                    { height: 10, width: "40%", opacity, marginTop: 10 },
                ]}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        padding: 15,
        paddingRight: 40,
        marginBottom: theme.spacing.lg,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#ccc",
    },
    skeletonContainer: {
        width: "100%",
        padding: 20,
        marginBottom: 15,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#ccc",
    },
    skeleton: {
        width: "100%",
        height: 15,
        backgroundColor: "#999",
        borderRadius: 5,
    },
});

export default ServiceItem;
