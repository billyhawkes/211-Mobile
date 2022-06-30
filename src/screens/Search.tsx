import React, { useState } from "react";
import { ScrollView, TextInput, StyleSheet } from "react-native";
import ScreenTitle from "../components/common/ScreenTitle";
import { useForm, Controller } from "react-hook-form";
import theme from "../styles/theme";
import useSearch from "../hooks/useSearch";
import useLocation from "../hooks/useLocation";
import ServiceList from "../components/service/ServiceList";

type FormData = {
	keyword: string;
};

const Search = () => {
	const [formData, setFormData] = useState<FormData>();
	const { control, handleSubmit, getValues, setValue } = useForm<FormData>();
	const { searchKeyword } = useSearch();
	const { location } = useLocation();
	const { data: services, isLoading } = searchKeyword(getValues("keyword"), location);

	const onSubmit = (data: FormData) => {
		setFormData(data);
	};

	return (
		<ScrollView style={{ paddingHorizontal: 15 }}>
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
			<ServiceList services={services?.Records} isLoading={isLoading} numItems={10} />
		</ScrollView>
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
	},
});

export default Search;
