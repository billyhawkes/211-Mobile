import * as Linking from "expo-linking";

const useLinkOut = () => {
    const call = (number: string) => {
        Linking.openURL(`tel:+1 ${number}`).catch(() => {
            console.log("Failed to start call.");
        });
    };

    const email = (email: string) => {
        Linking.openURL(`mailto: ${email}`).catch(() => {
            console.log("Failed to link out to email page.");
        });
    };

    const website = (link: string) => {
        Linking.openURL(link).catch(() => {
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

    return { call, email, website, maps };
};

export default useLinkOut;
