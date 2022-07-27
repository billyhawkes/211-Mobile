import TopicIcon from "@components/TopicIcon";
import TopicList from "@constants/TopicList";
import theme from "@constants/theme";
import React from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";

const Topics = () => {
    return (
        <ScrollView style={{ paddingHorizontal: theme.spacing.lg }}>
            <Text
                style={[
                    theme.textVariants.screenTitle,
                    { textAlign: "center" },
                ]}
            >
                Topics
            </Text>
            <View style={styles.container}>
                {TopicList.map((topic, index) => (
                    <TopicIcon key={index} {...topic} />
                ))}
                <View style={{ width: "30%" }} />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: theme.spacing.lg,
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
});

export default Topics;
