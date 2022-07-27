import { ScreenProps } from "@components/Navigation";
import StarButton from "@components/StarButton";
import Text from "@components/ui/Text";
import theme from "@constants/theme";
import { FontAwesome5 } from "@expo/vector-icons";
import useLinkOut from "@hooks/useLinkOut";
import { DrawerScreenProps } from "@react-navigation/drawer";
import React, { useEffect } from "react";
import { Pressable, ScrollView, View, StyleSheet } from "react-native";

const InfoSection = ({ title, text }: { title: string; text: string }) => {
    return (
        <>
            <Text type="header" style={styles.header}>
                {title}
            </Text>
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
            <Pressable style={styles.linkContainer} onPress={onPress}>
                <View style={{ marginRight: theme.spacing.md, width: 25 }}>
                    {icon}
                </View>
                {title ? (
                    <Text
                        style={{
                            fontWeight: "bold",
                            marginRight: 4,
                        }}
                    >
                        {title}:
                    </Text>
                ) : null}
                <Text type="link" numberOfLines={1} style={{ flex: 1 }}>
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
            <Text
                type="header"
                style={[styles.header, { marginTop: theme.spacing.lg }]}
            >
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
            <View style={{ marginTop: theme.spacing.lg }}></View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    centerContainer: {
        width: "100%",
        padding: theme.spacing.lg,
    },
    outerContainer: {
        width: "100%",
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderTopWidth: 0,
        padding: theme.spacing.lg,
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 5,
    },
    header: {
        width: "100%",
        paddingVertical: 10,
        paddingHorizontal: theme.spacing.lg,
        backgroundColor: theme.colors.primary,
        color: "#ffffff",
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        marginTop: theme.spacing.lg,
    },
    innerBreak: {
        marginHorizontal: -15,
        borderTopWidth: 1,
        borderColor: theme.colors.border,
    },
    linkContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: theme.spacing.lg,
    },
});

export default Service;
