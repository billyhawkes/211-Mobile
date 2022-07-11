import React, { useState } from "react";
import { TextInput, StyleSheet, Text } from "react-native";
import ScreenTitle from "../components/common/ScreenTitle";
import { useForm, Controller } from "react-hook-form";
import theme from "../styles/theme";
import useSearch from "../hooks/useSearch";
import useLocation from "../hooks/useLocation";
import ServiceList from "../components/service/ServiceList";
import ScreenContainer from "../components/common/ScreenContainer";
import SearchState from "../components/common/SearchState";

type FormData = {
	keyword: string;
};

const Search = () => {
	const [formData, setFormData] = useState<FormData>();
	const { control, handleSubmit, getValues, setValue } = useForm<FormData>();
	const { searchKeyword } = useSearch();
	const { location } = useLocation();
	const { data: services, isLoading, isError } = searchKeyword(getValues("keyword"), location);

	const onSubmit = (data: FormData) => {
		setFormData(data);
	};

	return (
		<ScreenContainer>
			<ScreenTitle name="Search" />
			<Controller
				control={control}
				rules={{
					required: true,
				}}
				render={({ field: { onChange, onBlur, value } }) => (
					<TextInput
						style={styles.input}
						onBlur={onBlur}
						onChangeText={onChange}
						value={value}
						selectionColor={theme.colors.primary}
						onSubmitEditing={handleSubmit(onSubmit)}
					/>
				)}
				name="keyword"
			/>
			<>{isLoading && <SearchState state={"loading"} />}</>
			<>{isError && <SearchState state={"error"} />}</>
			<>{services && services.RecordCount == 0 && <SearchState state={"not-found"} />}</>
			<>
				{!formData && !services && !isLoading && !isError && (
					<SearchState state={"waiting-to-search"} />
				)}
			</>
			<>{services && <ServiceList services={services.Records} />}</>
		</ScreenContainer>
	);
};

const styles = StyleSheet.create({
	input: {
		width: "100%",
		borderColor: "#ccc",
		borderWidth: 1,
		borderRadius: 5,
		paddingHorizontal: 15,
		marginBottom: 15,
		height: theme.spacing.xl2,
	},
});

export default Search;
