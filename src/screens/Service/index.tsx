import ScreenContainer from "@components/layouts/ScreenContainer";
import StarButton from "@components/services/StarButton";
import { FontAwesome5 } from "@expo/vector-icons";
import useLinkOut from "@hooks/useLinkOut";
import useServices from "@hooks/useServices";
import { ScreenParameters } from "@navigation/ScreenOptions";
import { DrawerScreenProps } from "@react-navigation/drawer";
import React, { useEffect } from "react";
import { Text, View } from "react-native";

import InfoSection from "./InfoSection";
import LinkSection from "./LinkSection";
import styles from "./styles";

const Service = ({
    route,
    navigation,
}: DrawerScreenProps<ScreenParameters, "Service">) => {
    const { service } = route.params;

    const {
        id,
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

    const location = `${PhysicalAddressStreet1}, ${PhysicalAddressCity}, ${PhysicalAddressProvince}`;
    const { maps } = useLinkOut();
    const { useAddFavourite, useRemoveFavourite, isFavourite } = useServices();

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <StarButton
                    starred={isFavourite(id)}
                    size={24}
                    onPress={(starred) =>
                        starred
                            ? useRemoveFavourite.mutate(service)
                            : useAddFavourite.mutate(service)
                    }
                />
            ),
        });
    }, [
        navigation,
        useAddFavourite,
        useRemoveFavourite,
        service,
        isFavourite,
        id,
    ]);

    return (
        <ScreenContainer>
            <Text style={[styles.header]}>{PublicName}</Text>
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
                              onPress={() => {
                                  console.log(Phone, ": TODO");
                              }}
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
                        onPress={() => {
                            console.log(Website, ": TODO");
                        }}
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
                        onPress={() => {
                            console.log(Email, ": TODO");
                        }}
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
        </ScreenContainer>
    );
};

export default Service;
