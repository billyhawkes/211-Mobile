import * as Location from "expo-location";
import { useEffect, useState } from "react";

const useLocation = () => {
    const [location, setLocation] = useState<UserLocation | undefined>();

    useEffect(() => {
        (async () => {
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
        })();
    }, []);

    return { location };
};

export default useLocation;
