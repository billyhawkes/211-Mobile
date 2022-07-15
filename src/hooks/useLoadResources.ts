import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useState } from "react";

const useLoadResources = () => {
    const [resLoaded, setResLoaded] = useState<boolean>(false);

    useEffect(() => {
        const load = async () => {
            try {
                // Show the splash screen
                await SplashScreen.preventAutoHideAsync();
                // Fonts
                await Font.loadAsync({
                    Lato: require("@assets/fonts/Lato-Regular.ttf"),
                });
                await new Promise((resolve) => setTimeout(resolve, 2000));
            } catch (e) {
                console.error(e);
            } finally {
                setResLoaded(true);
            }
        };
        load();
    }, []);

    const onLayoutRootView = useCallback(async () => {
        if (resLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [resLoaded]);

    return { resLoaded, onLayoutRootView };
};

export default useLoadResources;
