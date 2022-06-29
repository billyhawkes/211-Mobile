import { storiesOf } from "@storybook/react-native";
import ServiceItem from "../../src/components/ServiceItem";

storiesOf("Service Item", module).add("Default", () => (
	<ServiceItem service={{ PublicName: "Fake name", PhysicalAddressStreet1: "15 Fake Street" }} />
));
