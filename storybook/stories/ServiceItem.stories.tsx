import { storiesOf } from "@storybook/react-native";
import ServiceItem from "../../src/components/service/ServiceItem";

let service = {
    service: {
        PublicName: "Name Of A Fake Service",
        PhysicalAddressStreet1: "15 Fake Street",
    },
    starred: false,
    onPress: () => {},
    onPressStar: () => {},
};

storiesOf("Service Item", module)
    .add("Default", () => <ServiceItem {...service} />)
    .add("Starred", () => <ServiceItem {...service} starred={true} />)
    .add("Loading", () => <ServiceItem {...service} />);
