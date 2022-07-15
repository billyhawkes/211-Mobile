import TopicIcon from "@components/topic/TopicIcon";
import Button from "@components/ui/Button";
import { TopicList } from "@constants/TopicList";
import theme from "@constants/theme";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, StyleSheet, Text } from "react-native";

const TopicSection = () => {
    const navigation = useNavigation<DrawerNavigationProp<ScreenParameters>>();
    return (
        <View>
            <View style={styles.header}>
                <Text style={theme.textVariants.lg}>Topics</Text>
                <Button size="sm" onPress={() => navigation.navigate("Topics")}>
                    VIEW MORE
                </Button>
            </View>
            <View style={styles.topicsContainer}>
                {TopicList.slice(0, 6).map((topic, index) => (
                    <TopicIcon key={index} {...topic} />
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    topicsContainer: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        marginBottom: 20,
    },
});

export default TopicSection;
