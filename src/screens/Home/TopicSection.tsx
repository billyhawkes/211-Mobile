import Button from "@components/Button";
import theme from "@constants/theme";
import { ScreenProps } from "@features/navigation";
import { TopicIcon, TopicList } from "@features/search";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, StyleSheet, Text } from "react-native";

const TopicSection = () => {
    const navigation = useNavigation<DrawerNavigationProp<ScreenProps>>();
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
        marginBottom: theme.spacing.lg,
    },
});

export default TopicSection;
