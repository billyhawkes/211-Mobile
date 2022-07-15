import ScreenContainer from "@components/layouts/ScreenContainer";
import TopicIcon from "@components/topic/TopicIcon";
import { TopicList } from "@constants/TopicList";
import React from "react";
import { View, StyleSheet } from "react-native";

const Topics = () => {
    return (
        <ScreenContainer title="Topics">
            <View style={styles.container}>
                {TopicList.map((topic, index) => (
                    <TopicIcon key={index} {...topic} />
                ))}
                <View style={{ width: "30%" }} />
            </View>
        </ScreenContainer>
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
