import { storiesOf } from "@storybook/react-native";
import { action } from "@storybook/addon-actions";
import Button from "../../src/components/ui/Button";

storiesOf("Button", module)
	.add("Primary", () => (
		<Button primary onPress={action("Pressed")}>
			Press Me
		</Button>
	))
	.add("Ghost", () => <Button onPress={action("Pressed")}>Press Me</Button>);
