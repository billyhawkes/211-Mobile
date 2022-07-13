import React from "react";
import { Text, View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { DrawerParamList } from "../../navigation";
import ScreenContainer from "../../components/layouts/ScreenContainer";
import styles from "./styles";
import InfoSection from "./InfoSection";
import LinkSection from "./LinkSection";
import useLinkOut from "../../hooks/useLinkOut";

const Service = ({ route }: DrawerScreenProps<DrawerParamList, "Service">) => {
	const {
		service: {
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
		},
	} = route.params;

	const location = `${PhysicalAddressStreet1}, ${PhysicalAddressCity}, ${PhysicalAddressProvince}`;
	const { maps } = useLinkOut();

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
								onPress={() => {}}
								icon={<FontAwesome5 name="phone-alt" size={20} color="black" />}
								key={index}
							/>
					  ))
					: null}
				{Website ? (
					<LinkSection
						hr
						link={Website}
						onPress={() => {}}
						icon={<FontAwesome5 name="globe" size={20} color="black" />}
					/>
				) : null}
				{Email ? (
					<LinkSection
						hr
						link={Email}
						onPress={() => {}}
						icon={<FontAwesome5 name="envelope" size={20} color="black" />}
					/>
				) : null}
			</View>
			<>{Description ? <InfoSection title={"Description"} text={Description} /> : null}</>
			<>{Hours ? <InfoSection title={"Hours"} text={Hours} /> : null}</>
			<>{UpdatedOn ? <InfoSection title={"Last Updated"} text={UpdatedOn} /> : null}</>
		</ScreenContainer>
	);
};

export default Service;
