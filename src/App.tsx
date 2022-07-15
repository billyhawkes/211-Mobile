import "react-native-gesture-handler";
import { OPEN_STORYBOOK } from "@env";
import useLoadResources from "@hooks/useLoadResources";
import useLocation from "@hooks/useLocation";
import Navigation from "@navigation/index";
import { registerRootComponent } from "expo";
import React from "react";
import { View } from "react-native";
import { QueryClient, QueryClientProvider } from "react-query";

import StorybookUI from "../storybook";

function App() {
    const { resLoaded, onLayoutRootView } = useLoadResources();
    useLocation();
    const queryClient = new QueryClient();

    if (!resLoaded) {
        return null;
    }

    return (
        <QueryClientProvider client={queryClient}>
            <View
                style={{ flex: 1 }}
                onLayout={() => {
                    void (async () => {
                        await onLayoutRootView();
                    })();
                }}
            >
                <Navigation />
            </View>
        </QueryClientProvider>
    );
}

export default OPEN_STORYBOOK === "true"
    ? StorybookUI
    : registerRootComponent(App);
