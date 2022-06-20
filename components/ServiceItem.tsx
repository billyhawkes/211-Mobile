import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated, Pressable } from "react-native";
import { DrawerParamList } from "../navigation";
import globalStyles from "../styles/global";

type Props = {
	service?: any;
};

const ServiceItem = ({ service }: Props) => {
	const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();
	if (!service) {
		return <ServiceItemSkeleton />;
	}

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
		<View style={styles.container}>
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
		marginBottom: "15px",
		borderRadius: 5,
	},
	skeleton: {
		width: "100%",
		height: "15px",
		backgroundColor: "#999",
		borderRadius: 5,
	},
});

export default ServiceItem;
