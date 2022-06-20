import AsyncStorage from "@react-native-async-storage/async-storage";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated, Pressable } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { DrawerParamList } from "../navigation";
import globalStyles from "../styles/global";
import { FontAwesome } from "@expo/vector-icons";

type Props = {
	service?: any;
};

const ServiceItem = ({ service }: Props) => {
	const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();
	if (!service) {
		return <ServiceItemSkeleton />;
	}

	const addFavourite = async (service: any) => {
		try {
			const favouritesJSON = await AsyncStorage.getItem("favourites");
			if (favouritesJSON != null) {
				let favourites = JSON.parse(favouritesJSON);
				console.log(favourites);
				const jsonValue = JSON.stringify([...favourites, service]);
				await AsyncStorage.setItem("favourites", jsonValue);
			} else {
				const jsonValue = JSON.stringify([service]);
				await AsyncStorage.setItem("favourites", jsonValue);
			}
		} catch (err) {
			// Error
		}
	};

	return (
		<Pressable
			onPress={() => navigation.navigate("Service", { service })}
			style={styles.container}
		>
			<Text style={[globalStyles.p, { fontWeight: "bold" }]} numberOfLines={1}>
				{service.PublicName}
			</Text>
			<Text style={[globalStyles.p, { opacity: 0.7, fontSize: 12, marginTop: "10px" }]}>
				{service.PhysicalAddressStreet1}
			</Text>
			<Pressable style={styles.star} onPress={() => addFavourite(service)}>
				<FontAwesome name="star-o" size={24} color="black" />
			</Pressable>
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
					{ height: "10px", width: "40%", opacity: opacity as any, marginTop: "10px" },
				]}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: "100%",
		boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25);",
		padding: "20px",
		paddingRight: "40px",
		marginBottom: "15px",
		borderRadius: 5,
	},
	skeletonContainer: {
		width: "100%",
		boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25);",
		padding: "20px",
		marginBottom: "15px",
		borderRadius: 5,
	},
	star: {
		position: "absolute",
		right: 0,
		top: 0,
		padding: "10px",
	},
	skeleton: {
		width: "100%",
		height: "15px",
		backgroundColor: "#999",
		borderRadius: 5,
	},
});

export default ServiceItem;
