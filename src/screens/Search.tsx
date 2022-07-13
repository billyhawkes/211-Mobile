import React, { useState } from "react";
import { TextInput, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import theme from "../constants/theme";
import useSearch from "../hooks/useSearch";
import useLocation from "../hooks/useLocation";
import ServiceList from "../components/service/ServiceList";
import ScreenContainer from "../components/layouts/ScreenContainer";
import SearchState from "../components/search/SearchState";

type FormData = {
	keyword: string;
};

const Search = () => {
	const [formData, setFormData] = useState<FormData>();
	const { control, handleSubmit, getValues, setValue } = useForm<FormData>();
	const { searchKeyword } = useSearch();
	const { location } = useLocation();
	const {
		data: services,
		isLoading,
		isError,
		isIdle,
	} = searchKeyword(getValues("keyword"), location);

	const onSubmit = (data: FormData) => {
		setFormData(data);
	};

	return (
		<ScreenContainer title="Search">
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
			<>{isLoading ? <SearchState state={"loading"} /> : null}</>
			<>{isError ? <SearchState state={"error"} /> : null}</>
			<>
				{services && services.RecordCount == 0 ? <SearchState state={"not-found"} /> : null}
			</>
			<>{isIdle ? <SearchState state={"waiting-to-search"} /> : null}</>
			<>{services ? <ServiceList services={services.Records} /> : null}</>
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
