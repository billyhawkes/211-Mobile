import { FontAwesome } from "@expo/vector-icons";
import useFavourites from "@hooks/useFavourites";
import { ServiceRecord } from "@typesGlobal/service";
import React from "react";
import { Pressable, StyleSheet } from "react-native";

type Props = {
    service: ServiceRecord;
    size: number;
};

const StarButton = ({ service, size }: Props) => {
    const { isFavourite, useAddFavourite, useRemoveFavourite } =
        useFavourites();
    const starred = isFavourite(service.id);

    const onPressHandler = () =>
        starred
            ? useRemoveFavourite.mutate(service)
            : useAddFavourite.mutate(service);

    return (
        <Pressable style={styles.star} onPress={onPressHandler}>
            <FontAwesome
                name={starred ? "star" : "star-o"}
                size={size}
                color={starred ? "#FDCC0D" : "black"}
            />
        </Pressable>
    );
};

const styles = StyleSheet.create({
    star: {
        position: "absolute",
        right: 0,
        top: 0,
        padding: 10,
    },
});

export default StarButton;
