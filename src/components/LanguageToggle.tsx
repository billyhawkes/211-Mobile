import React from "react";
import { Pressable, View, Text } from "react-native";

const LanguageToggle = () => (
	<View>
		<Pressable>
			<Text>EN</Text>
		</Pressable>
		<Pressable>
			<Text>FR</Text>
		</Pressable>
	</View>
);

export default LanguageToggle;
