import "react-native-gesture-handler";
import { SENTRY_DSN, SENTRY_DEBUG } from "@env";
import { Navigation } from "@features/navigation";
import useLoadResources from "@hooks/useLoadResources";
import useLocation from "@hooks/useLocation";
import { registerRootComponent } from "expo";
import React from "react";
import { View } from "react-native";
import { QueryClient, QueryClientProvider } from "react-query";
import * as Sentry from "sentry-expo";

Sentry.init({
    dsn: `${SENTRY_DSN}`,
    enableInExpoDevelopment: true,
    debug: SENTRY_DEBUG === "true",
});

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
