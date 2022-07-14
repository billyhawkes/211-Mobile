import "react-native-gesture-handler";
import StorybookUI from "../storybook";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import useLocation from "@/hooks/useLocation";
import Navigation from "@/navigation";
import useLoadResources from "@/hooks/useLoadResources";
import { View } from "react-native";
import { registerRootComponent } from "expo";

const App = () => {
	const { resLoaded, onLayoutRootView } = useLoadResources();
	useLocation();
	const queryClient = new QueryClient();

	if (!resLoaded) {
		return null;
	}

	return (
		<QueryClientProvider client={queryClient}>
			<View style={{ flex: 1 }} onLayout={onLayoutRootView}>
				<Navigation />
			</View>
		</QueryClientProvider>
	);
};

export default false ? StorybookUI : registerRootComponent(App);
