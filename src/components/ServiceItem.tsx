import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Animated, Pressable } from "react-native";
import { DrawerParamList } from "../navigation";
import { FontAwesome } from "@expo/vector-icons";
import useFavourites from "../hooks/useFavourites";

type Props = {
	service?: any;
};

const ServiceItem = ({ service }: Props) => {
	const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();
	const [isFavourite, setIsFavourite] = useState(false);
	const { findFavourites, addFavourite, removeFavourite } = useFavourites();
	const { data: favourites } = findFavourites;

	if (!service) {
		return <ServiceItemSkeleton />;
	}

	useEffect(() => {
		setIsFavourite(!!favourites.find((o: any) => o.id === service.id));
	}, [favourites]);

	return (
		<Pressable
			onPress={() => navigation.navigate("Service", { service })}
			style={styles.container}
		>
			<Text style={[{ fontWeight: "bold" }]} numberOfLines={1}>
				{service.PublicName}
			</Text>
			<Text style={[{ opacity: 0.7, fontSize: 12, marginTop: 10 }]}>
				{service.PhysicalAddressStreet1}
			</Text>
			{isFavourite ? (
				<Pressable style={styles.star} onPress={() => removeFavourite.mutate(service)}>
					<FontAwesome name="star" size={24} color="#FDCC0D" />
				</Pressable>
			) : (
				<Pressable style={styles.star} onPress={() => addFavourite.mutate(service)}>
					<FontAwesome name="star-o" size={24} color="black"></FontAwesome>
				</Pressable>
			)}
		</Pressable>
	);
};

const ServiceItemSkeleton = () => {
	const opacity = useRef(new Animated.Value(0.3)).current;

	useEffect(() => {
		Animated.loop(
			Animated.sequence([
				Animated.timing(opacity, {
					toValue: 1,
					useNativeDriver: false,
					duration: 500,
				} as any),
				Animated.timing(opacity, {
					toValue: 0.3,
					useNativeDriver: false,
					duration: 800,
				} as any),
			])
		).start();
	}, [opacity]);

	return (
		<View style={styles.skeletonContainer}>
			<Animated.View style={[styles.skeleton, { opacity: opacity as any }]} />
			<Animated.View
				style={[
					styles.skeleton,
					{ height: 10, width: "40%", opacity: opacity as any, marginTop: 10 },
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
