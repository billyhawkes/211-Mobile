import { useEffect, useState } from "react";
import * as Location from "expo-location";

export type UserLocation = {
	latitude: number;
	longitude: number;
};

const useLocation = () => {
	const [location, setLocation] = useState<UserLocation | undefined>();

	useEffect(() => {
		(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				console.log("Permission to access location was denied");
				return;
			}

			let location = await Location.getCurrentPositionAsync({});
			setLocation({
				latitude: location.coords.latitude,
				longitude: location.coords.longitude,
			});
		})();
	}, []);

	console.log(location);

	return { location };
};

export default useLocation;
