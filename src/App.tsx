import "react-native-gesture-handler";
import { Navigation } from "@features/navigation";
import useLoadResources from "@hooks/useLoadResources";
import useLocation from "@hooks/useLocation";
import { registerRootComponent } from "expo";
import React from "react";
import { View } from "react-native";
import { QueryClient, QueryClientProvider } from "react-query";

function App() {
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
}

export default registerRootComponent(App);
