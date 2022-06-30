import { storiesOf } from "@storybook/react-native";
import Service from "../../src/screens/Service";

let service = {
	PublicName: "Name Of A Fake Service",
	PhysicalAddressStreet1: "15 Fake Street",
	Description: "Hello world",
};

storiesOf("Service Screen", module).add("Default", () => <Service {...service} />);
