import theme from "@constants/theme";
import { FontAwesome5 } from "@expo/vector-icons";
import { StarButton } from "@features/favourites";
import { ScreenProps } from "@features/navigation";
import useLinkOut from "@hooks/useLinkOut";
import { DrawerScreenProps } from "@react-navigation/drawer";
import React, { useEffect } from "react";
import { Pressable, ScrollView, Text, View, StyleSheet } from "react-native";

const InfoSection = ({ title, text }: { title: string; text: string }) => {
    return (
        <>
            <Text style={[styles.header]}>{title}</Text>
            <View style={styles.outerContainer}>
                <Text>{text}</Text>
            </View>
        </>
    );
};

type LinkSectionProps = {
    link: string;
    title?: string;
    icon: JSX.Element;
    hr?: boolean;
    onPress: () => void;
};

const LinkSection = ({ link, title, icon, hr, onPress }: LinkSectionProps) => {
    return (
        <>
            {hr ? <View style={styles.innerBreak} /> : null}
            <Pressable style={[styles.linkContainer]} onPress={onPress}>
                <View style={{ marginRight: theme.spacing.md }}>{icon}</View>
                {title ? (
                    <Text style={{ fontWeight: "bold" }}>{title}:</Text>
                ) : null}
                <Text
                    style={[styles.link, { marginLeft: 4 }]}
                    numberOfLines={1}
                >
                    {link}
                </Text>
            </Pressable>
        </>
    );
};

const Service = ({
    route,
    navigation,
}: DrawerScreenProps<ScreenProps, "Service">) => {
    const { service } = route.params;

    const {
        PublicName,
        PhysicalAddressPostalCode,
        PhysicalAddressStreet1,
        PhysicalAddressCity,
        PhysicalAddressProvince,
        PhoneNumbers,
        Description,
        Email,
        Website,
        UpdatedOn,
        Hours,
    } = service;

    const location = `${PhysicalAddressStreet1} ${PhysicalAddressCity} ${PhysicalAddressProvince}`;
    const { maps, call, email, website } = useLinkOut();

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => <StarButton service={service} size={24} />,
        });
    }, [navigation, service]);

    return (
        <ScrollView style={{ paddingHorizontal: theme.spacing.lg }}>
            <Text style={[styles.header, { marginTop: theme.spacing.lg }]}>
                {PublicName}
            </Text>
            <View style={[styles.outerContainer, { paddingVertical: 0 }]}>
                <LinkSection
                    link={location}
                    onPress={() => maps(PhysicalAddressPostalCode)}
                    icon={<FontAwesome5 name="map" size={20} color="black" />}
                />
                {PhoneNumbers && PhoneNumbers.length > 0
                    ? PhoneNumbers.map(({ Name, Phone }, index) => (
                          <LinkSection
                              hr
                              link={Phone}
                              title={Name}
                              onPress={() => call(Phone)}
                              icon={
                                  <FontAwesome5
                                      name="phone-alt"
                                      size={20}
                                      color="black"
                                  />
                              }
                              key={index}
                          />
                      ))
                    : null}
                {Website ? (
                    <LinkSection
                        hr
                        link={Website}
                        onPress={() => website(Website)}
                        icon={
                            <FontAwesome5
                                name="globe"
                                size={20}
                                color="black"
                            />
                        }
                    />
                ) : null}
                {Email ? (
                    <LinkSection
                        hr
                        link={Email}
                        onPress={() => email(Email)}
                        icon={
                            <FontAwesome5
                                name="envelope"
                                size={20}
                                color="black"
                            />
                        }
                    />
                ) : null}
            </View>
            <>
                {Description ? (
                    <InfoSection title={"Description"} text={Description} />
                ) : null}
            </>
            <>{Hours ? <InfoSection title={"Hours"} text={Hours} /> : null}</>
            <>
                {UpdatedOn ? (
                    <InfoSection title={"Last Updated"} text={UpdatedOn} />
                ) : null}
            </>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    centerContainer: {
        width: "100%",
        padding: 15,
    },
    outerContainer: {
        width: "100%",
        borderWidth: 1,
        borderColor: "#ccc",
        borderTopWidth: 0,
        padding: 15,
        marginBottom: 15,
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 5,
    },
    header: {
        width: "100%",
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: theme.colors.primary,
        color: "#ffffff",
        fontWeight: "bold",
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    innerBreak: {
        marginHorizontal: -15,
        borderTopWidth: 1,
        borderColor: "#ccc",
    },
    link: {
        color: theme.colors.link,
        textDecorationLine: "underline",
    },
    linkContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 15,
    },
});

export default Service;
