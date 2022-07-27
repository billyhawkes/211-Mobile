import TopicIcon from "@components/TopicIcon";
import Text from "@components/ui/Text";
import TopicList from "@constants/TopicList";
import theme from "@constants/theme";
import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";

const Topics = () => {
    return (
        <ScrollView style={{ paddingHorizontal: theme.spacing.lg }}>
            <Text type="title">Topics</Text>
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
