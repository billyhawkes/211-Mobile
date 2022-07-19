import * as Location from "expo-location";
import { useEffect, useState } from "react";

export type UserLocation = {
    latitude: number;
    longitude: number;
};

const useLocation = () => {
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
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            });
        };
        getGPSLocation().catch(() => {
            console.log("Failed to obtain location.");
        });
    }, []);

    return { location };
};

export default useLocation;
