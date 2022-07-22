import ScreenTitle from "@components/ScreenTitle";
import theme from "@constants/theme";
import { TopicIcon, TopicList } from "@features/search";
import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";

const Topics = () => {
    return (
        <ScrollView style={{ paddingHorizontal: theme.spacing.lg }}>
            <ScreenTitle title="Topics" />
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
        padding: 15,
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
});

export default Topics;
