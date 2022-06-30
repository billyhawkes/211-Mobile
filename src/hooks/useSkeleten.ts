import { useEffect, useRef } from "react";
import { Animated } from "react-native";

const useSkeleten = () => {
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

	return { opacity };
};

export default useSkeleten;
