import { Service } from "@hooks/useServices";
import { storiesOf } from "@storybook/react-native";
import React from "react";

import ServiceItem from "../../src/components/service/ServiceItem";

const service: Service = {
    id: 0,
    CurrentId: 0,
    ParentId: 0,
    Description: "",
    Distance: 0,
    Email: "",
    Hours: "",
    Hours2: "",
    Latitude: 0,
    Longitude: 0,
    MailingAddressCity: "",
    MailingAddressCountry: "",
    MailingAddressPostalCode: "",
    MailingAddressProvince: "",
    MailingAddressStreet1: "",
    MailingAddressStreet2: "",
    MailingAttentionName: "",
    MaxAge: "",
    MinAge: "",
    PhoneNumbers: [],
    PhysicalAddressCity: "",
    PhysicalAddressCountry: "",
    PhysicalAddressPostalCode: "",
    PhysicalAddressProvince: "",
    PhysicalAddressStreet1: "15 Fake Street",
    PhysicalAddressStreet2: "",
    PublicName: "Name Of A Fake Service",
    RecordOwner: "",
    Score: 0,
    ServiceArea: [],
    UpdatedOn: "",
    Website: "",
};

const onPress = () => {
    console.log("Pressed.");
};

const onPressStar = () => {
    console.log("Pressed Star.");
};

storiesOf("Service Item", module)
    .add("Default", () => (
        <ServiceItem
            service={service}
            onPress={onPress}
            onPressStar={onPressStar}
        />
    ))
    .add("Starred", () => (
        <ServiceItem
            service={service}
            starred={true}
            onPress={onPress}
            onPressStar={onPressStar}
        />
    ))
    .add("Loading", () => (
        <ServiceItem
            service={service}
            onPress={onPress}
            onPressStar={onPress}
        />
    ));
