import { FontAwesome } from "@expo/vector-icons";
import useSkeleten from "@hooks/useSkeleten";
import React from "react";
import { View, Text, StyleSheet, Animated, Pressable } from "react-native";

type Props = {
    service: Service;
    starred: boolean;
    onPress: () => void;
    onPressStar: (starred: boolean) => void;
};

const ServiceItem = ({ service, starred, onPress, onPressStar }: Props) => {
    return (
        <Pressable onPress={onPress} style={styles.container}>
            <Text style={[{ fontWeight: "bold" }]} numberOfLines={1}>
                {service.PublicName}
            </Text>
            <Text style={[{ opacity: 0.7, fontSize: 12, marginTop: 10 }]}>
                {service.PhysicalAddressStreet1}
            </Text>
            <Pressable style={styles.star} onPress={() => onPressStar(starred)}>
                <FontAwesome
                    name={starred ? "star" : "star-o"}
                    size={24}
                    color={starred ? "#FDCC0D" : "black"}
                />
            </Pressable>
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
        marginBottom: 15,
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
    star: {
        position: "absolute",
        right: 0,
        top: 0,
        padding: 10,
    },
    skeleton: {
        width: "100%",
        height: 15,
        backgroundColor: "#999",
        borderRadius: 5,
    },
});

export default ServiceItem;
