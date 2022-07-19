import { EMAIL_211_LINK, PHONE_211_NUMBER } from "@env";
import * as Linking from "expo-linking";

const useLinkOut = () => {
    const call = () => {
        Linking.openURL(`tel:+1 ${PHONE_211_NUMBER}`).catch(() => {
            console.log("Failed to start call.");
        });
    };

    const email = () => {
        Linking.openURL(`${EMAIL_211_LINK}`).catch(() => {
            console.log("Failed to link out to email page.");
        });
    };

    const maps = (postalCode: string) => {
        const url = `https://www.google.com/maps/search/?api=1&query=${postalCode.slice(
            0,
            3
        )}+${postalCode.slice(-3)}`;
        Linking.openURL(url).catch(() => {
            console.log("Failed to link out to maps.");
        });
    };

    return { call, email, maps };
};

export default useLinkOut;
