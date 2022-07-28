import { UserLocation } from "@typesGlobal/location";
import * as Location from "expo-location";
import { useEffect, useState } from "react";

const useLocation = () => {
    const defaultLocation = {
        lat: 43.6532,
        lng: -79.3832,
    };
    const [location, setLocation] = useState<UserLocation | undefined>();

    useEffect(() => {
        const getGPSLocation = async () => {
            const { status } =
                await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                console.log("Permission to access location was denied");
                return;
            }

            const location = await Location.getCurrentPositionAsync({});
            setLocation({
                lat: location.coords.latitude,
                lng: location.coords.longitude,
            });
        };
        getGPSLocation().catch(() => {
            console.log("Failed to obtain location.");
        });
    }, []);

    return { location, defaultLocation };
};

export default useLocation;
