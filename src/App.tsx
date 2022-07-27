import "react-native-gesture-handler";
import Navigation from "@components/Navigation";
import { SENTRY_DSN, SENTRY_DEBUG } from "@env";
import { Lato_400Regular } from "@expo-google-fonts/lato";
import useLocation from "@hooks/useLocation";
import { registerRootComponent } from "expo";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React, { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { QueryClient, QueryClientProvider } from "react-query";
import * as Sentry from "sentry-expo";

Sentry.init({
    dsn: `${SENTRY_DSN}`,
    enableInExpoDevelopment: true,
    debug: SENTRY_DEBUG === "true",
});

const useLoadResources = () => {
    const [resLoaded, setResLoaded] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>();
    const [isError, setIsError] = useState<boolean>(false);

    useEffect(() => {
        const load = async () => {
            // Show the splash screen
            await SplashScreen.preventAutoHideAsync();
            // Fonts
            await Font.loadAsync({
                Lato: Lato_400Regular,
            });
            await new Promise((resolve) => setTimeout(resolve, 2000));
        };
        load()
            .then(() => setResLoaded(true))
            .catch((e: Error) => {
                setError(e);
                setIsError(true);
            });
    }, []);

    const onLayoutRootView = useCallback(() => {
        if (resLoaded) {
            // Hide the splash screen
            SplashScreen.hideAsync().catch((e: Error) => {
                setError(e);
                setIsError(true);
            });
        }
    }, [resLoaded]);

    return { error, isError, resLoaded, onLayoutRootView };
};

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

export default registerRootComponent(App);
