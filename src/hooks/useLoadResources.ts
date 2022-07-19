import { Lato_400Regular } from "@expo-google-fonts/lato";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useState } from "react";

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

export default useLoadResources;
