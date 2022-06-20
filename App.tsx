import { useFonts, Lato_400Regular } from "@expo-google-fonts/lato";
import React, { useEffect } from "react";
import "react-native-gesture-handler";
import { QueryClient, QueryClientProvider } from "react-query";
import useFavourites from "./hooks/useFavourites";
import Navigation from "./navigation";
import Splash from "./screens/Splash";

export default function App() {
	const queryClient = new QueryClient();
	let [fontsLoaded] = useFonts({
		Lato_400Regular,
	});

	if (!fontsLoaded) {
		return <Splash />;
	}

	return (
		<QueryClientProvider client={queryClient}>
			<Navigation />
		</QueryClientProvider>
	);
}
