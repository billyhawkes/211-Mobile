import HomeImage from "@assets/svg/home-image-undraw.svg";
import Button from "@components/Button";
import theme from "@constants/theme";
import { EMAIL_211_LINK, PHONE_211_NUMBER } from "@env";
import { FavouritesList } from "@features/favourites";
import { ScreenProps } from "@features/navigation";
import { TopicIcon, TopicList } from "@features/search";
import useLinkOut from "@hooks/useLinkOut";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { ScrollView, View, StyleSheet, Text } from "react-native";

const Home = () => {
    const navigation = useNavigation<DrawerNavigationProp<ScreenProps>>();
    const { call, email } = useLinkOut();

    return (
        <ScrollView style={{ paddingHorizontal: theme.spacing.lg }}>
            <HomeImage width="100%" height={210} style={{ marginTop: 15 }} />
            <View style={styles.imageUnderline} />
            <View style={styles.contactContainer}>
                <Button
                    primary
                    onPress={() => call(`${PHONE_211_NUMBER}`)}
                    style={{ marginRight: theme.spacing["md"], flex: 1 }}
                >
                    CALL US
                </Button>
                <Button
                    primary
                    onPress={() => email(`${EMAIL_211_LINK}`)}
                    style={{ flex: 1 }}
                >
                    EMAIL US
                </Button>
            </View>
            <View style={styles.sectionHeader}>
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
            <View style={styles.sectionHeader}>
                <Text style={theme.textVariants.lg}>Favourites</Text>
                <Button
                    size="sm"
                    onPress={() => navigation.navigate("Favourites")}
                >
                    VIEW MORE
                </Button>
            </View>
            <FavouritesList limit={2} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    imageUnderline: {
        width: "100%",
        margin: "auto",
        height: 4,
        backgroundColor: "#2f2e41",
        borderRadius: 3,
    },
    contactContainer: {
        position: "relative",
        width: "100%",
        display: "flex",
        flexDirection: "row",
        marginVertical: 15,
        justifyContent: "space-between",
    },
    sectionHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        marginBottom: theme.spacing.lg,
    },
    topicsContainer: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
});

export default Home;
