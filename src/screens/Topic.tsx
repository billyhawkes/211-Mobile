import React, { useEffect, useRef } from "react";
import { ScrollView, Text, StyleSheet, View, Animated } from "react-native";
import ServiceItem from "../components/ServiceItem";
import useLocation from "../hooks/useLocation";
import useTopic from "../hooks/useTopic";
import colors from "../styles/colors";
import globalStyles from "../styles/global";

const Topic = ({ route }: any) => {
	const { name } = route.params;
	const { searchTopic } = useTopic();
	const { location } = useLocation();
	const { data, isLoading } = searchTopic(name, location);

	return (
		<ScrollView>
			<View style={styles.container}>
				<Text style={globalStyles.pageTitle}>{name}</Text>
				{data && <Text style={globalStyles.p}>{data.RecordCount} records</Text>}
				{data &&
					data.Records.map((service: any, index) => (
						<ServiceItem key={index} service={service} />
					))}
				{isLoading && (
					<View style={{ paddingTop: 18 }}>
						{[0, 1, 2, 3, 4, 5, 6, 7].map((key) => (
							<ServiceItem key={key} service={undefined} />
						))}
					</View>
				)}
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: "15px",
		backgroundColor: colors.background,
	},
});

export default Topic;
