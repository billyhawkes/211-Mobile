import { useFonts, Lato_400Regular } from "@expo-google-fonts/lato";
import React from "react";
import "react-native-gesture-handler";
import { QueryClient, QueryClientProvider } from "react-query";
import useLocation from "./src/hooks/useLocation";
import Navigation from "./src/navigation";
import Splash from "./src/screens/Splash";

export default function App() {
	const queryClient = new QueryClient();
	useLocation();
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
