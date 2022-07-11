import React from "react";
import ScreenContainer from "../components/common/ScreenContainer";
import ScreenTitle from "../components/common/ScreenTitle";
import SearchState from "../components/common/SearchState";
import ServiceList from "../components/service/ServiceList";
import useLocation from "../hooks/useLocation";
import useSearch from "../hooks/useSearch";

const Topic = ({ route }: any) => {
	const { name } = route.params;
	const { searchTopic } = useSearch();
	const { location } = useLocation();
	const { data: services, isLoading, isError } = searchTopic(name, location);

	return (
		<ScreenContainer>
			<ScreenTitle name={name} />
			<>{isLoading && <SearchState state={"loading"} />}</>
			<>{isError && <SearchState state={"error"} />}</>
			<>{services && services.RecordCount == 0 && <SearchState state={"not-found"} />}</>
			<>{services && <ServiceList services={services.Records} />}</>
		</ScreenContainer>
	);
};

export default Topic;
