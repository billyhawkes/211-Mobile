import { DrawerScreenProps } from "@react-navigation/drawer";
import React from "react";
import ScreenContainer from "../components/layouts/ScreenContainer";
import SearchState from "../components/ui/SearchState";
import ServiceList from "../components/ServiceList";
import useLocation from "../hooks/useLocation";
import useSearch from "../hooks/useSearch";
import { DrawerParamList } from "../navigation";

const Topic = ({ route }: DrawerScreenProps<DrawerParamList, "Topic">) => {
	const { name } = route.params;
	const { searchTopic } = useSearch();
	const { location } = useLocation();
	const { data: services, isLoading, isError } = searchTopic(name, location);

	return (
		<ScreenContainer title={name}>
			<>{isLoading && <SearchState state={"loading"} />}</>
			<>{isError && <SearchState state={"error"} />}</>
			<>{services && services.RecordCount == 0 && <SearchState state={"not-found"} />}</>
			<>{services && <ServiceList services={services.Records} />}</>
		</ScreenContainer>
	);
};

export default Topic;
