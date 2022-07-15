module.exports = function (api) {
    api.cache(true);
    return {
        presets: ["babel-preset-expo"],
        plugins: [
            "module:react-native-dotenv",
            "react-native-reanimated/plugin",
            [
                "module-resolver",
                {
                    root: ["./"],
                    alias: {
                        "@hooks": "./src/hooks",
                        "@components": "./src/components",
                        "@screens": "./src/screens",
                        "@navigation": "./src/navigation",
                        "@constants": "./src/constants",
                        "@assets": "./src/assets",
                    },
                },
            ],
        ],
    };
};
