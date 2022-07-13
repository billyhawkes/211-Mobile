import * as Linking from "expo-linking";

const useLinkOut = () => {
	const call = (number: string) => {
		console.log(number);
	};

	const text = (number: string) => {
		console.log(number);
	};

	const maps = (postalCode: string) => {
		const url = `https://www.google.com/maps/search/?api=1&query=${postalCode.slice(
			0,
			3
		)}+${postalCode.slice(-3)}`;
		Linking.openURL(url);
	};

	return { call, text, maps };
};

export default useLinkOut;
