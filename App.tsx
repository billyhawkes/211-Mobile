import "react-native-gesture-handler";
import StorybookUI from "./storybook";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import useLocation from "./src/hooks/useLocation";
import Navigation from "./src/navigation";
import useLoadResources from "./src/hooks/useLoadResources";
import { View } from "react-native";

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

export default false ? StorybookUI : App;
