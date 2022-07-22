import { SENTRY_AUTH_TOKEN } from "react-native-dotenv";

export default {
    expo: {
        name: "211 Mobile",
        slug: "211Mobile",
        owner: "billyhawkes",
        version: "0.0.1",
        orientation: "portrait",
        icon: "./src/assets/images/icon.png",
        userInterfaceStyle: "light",
        splash: {
            image: "./src/assets/images/splash.png",
            resizeMode: "cover",
        },
        updates: {
            fallbackToCacheTimeout: 0,
        },
        assetBundlePatterns: ["**/*"],
        ios: {
            supportsTablet: true,
        },
        android: {
            adaptiveIcon: {
                foregroundImage: "./src/assets/images/adaptive-icon.png",
                backgroundColor: "#2179BE",
            },
        },
        web: {
            favicon: "./src/assets/images/favicon.png",
        },
        plugins: ["sentry-expo"],
        hooks: {
            postPublish: [
                {
                    file: "sentry-expo/upload-sourcemaps",
                    config: {
                        organization: "billy-hawkes",
                        project: "211-mobile",
                        authToken: `${SENTRY_AUTH_TOKEN}`,
                    },
                },
            ],
        },
    },
};
