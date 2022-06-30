import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import ScreenTitle from "../components/common/ScreenTitle";
import ServiceList from "../components/service/ServiceList";
import useLocation from "../hooks/useLocation";
import useSearch from "../hooks/useSearch";

const Topic = ({ route }: any) => {
	const { name } = route.params;
	const { searchTopic } = useSearch();
	const { location } = useLocation();
	const { data, isLoading } = searchTopic(name, location);

	return (
		<ScrollView>
			<View style={styles.container}>
				<ScreenTitle name={name} />
				<ServiceList services={data?.Records} isLoading={isLoading} numItems={10} />
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 15,
	},
});

export default Topic;
