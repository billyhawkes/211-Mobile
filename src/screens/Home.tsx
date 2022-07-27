import HomeImage from "@assets/svg/home-image-undraw.svg";
import { ScreenProps } from "@components/Navigation";
import ServiceItem from "@components/ServiceItem";
import { Empty, ErrorFound, Loading } from "@components/ServiceState";
import TopicIcon from "@components/TopicIcon";
import Button from "@components/ui/Button";
import Text from "@components/ui/Text";
import TopicList from "@constants/TopicList";
import theme from "@constants/theme";
import { EMAIL_211_LINK, PHONE_211_NUMBER } from "@env";
import useFavourites from "@hooks/useFavourites";
import useLinkOut from "@hooks/useLinkOut";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { ScrollView, View, StyleSheet } from "react-native";

const Home = () => {
    const navigation = useNavigation<DrawerNavigationProp<ScreenProps>>();
    const { call, email } = useLinkOut();
    const { useFindFavourites } = useFavourites();
    const { data: favourites, isLoading, isError } = useFindFavourites;

    return (
        <ScrollView style={{ paddingHorizontal: theme.spacing.lg }}>
            <HomeImage
                width="100%"
                height={210}
                style={{ marginTop: theme.spacing.lg }}
            />
            <View style={styles.imageUnderline} />
            {/* CONTACT SECTION */}
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
            {/* TOPIC SECTION */}
            <View style={styles.sectionHeader}>
                <Text type="header">Topics</Text>
                <Button size="sm" onPress={() => navigation.navigate("Topics")}>
                    VIEW MORE
                </Button>
            </View>
            <View style={styles.topicsContainer}>
                {TopicList.slice(0, 6).map((topic, index) => (
                    <TopicIcon key={index} {...topic} />
                ))}
            </View>
            {/* FAVOURTIES SECTION */}
            <View style={{ marginBottom: theme.spacing.lg }}>
                <View style={styles.sectionHeader}>
                    <Text type="header">Favourites</Text>
                    <Button
                        size="sm"
                        onPress={() => navigation.navigate("Favourites")}
                    >
                        VIEW MORE
                    </Button>
                </View>
                {isLoading ? (
                    <Loading skeletons={2} />
                ) : isError ? (
                    <ErrorFound />
                ) : favourites && favourites.length === 0 ? (
                    <Empty title="No favourites yet!" />
                ) : null}
                {favourites
                    ? favourites
                          .slice(0, 2)
                          .map((service) => (
                              <ServiceItem key={service.id} service={service} />
                          ))
                    : null}
            </View>
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
        marginVertical: theme.spacing.lg,
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
