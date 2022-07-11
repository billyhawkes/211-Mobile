import theme from "../../styles/theme";
import { Text, StyleSheet } from "react-native";
import NotFoundImage from "../../assets/images/not-found-undraw.svg";
import WaitingToSearchImage from "../../assets/images/waiting-to-search-undraw.svg";
import ErrorImage from "../../assets/images/error-undraw.svg";
import React from "react";
import { ServiceItemSkeleton } from "../service/ServiceItem";

type Props = {
	state: "loading" | "error" | "not-found" | "waiting-to-search";
};

const SearchState = ({ state }: Props) => {
	switch (state) {
		case "loading":
			return (
				<>
					{[...Array(10)].map((_, index) => (
						<ServiceItemSkeleton key={index} />
					))}
				</>
			);
		case "not-found":
			return (
				<>
					<NotFoundImage width="100%" height={120} style={styles.image} />
					<Text style={[theme.textVariants.md, styles.text]}>No results found.</Text>
				</>
			);
		case "error":
			return (
				<>
					<ErrorImage width="100%" height={120} style={styles.image} />
					<Text style={[theme.textVariants.md, styles.text]}>
						Error. Please try again.
					</Text>
				</>
			);
		default:
			return (
				<>
					<WaitingToSearchImage width="100%" height={120} style={styles.image} />
					<Text style={[theme.textVariants.md, styles.text]}>Waiting to search!</Text>
				</>
			);
	}
};

const styles = StyleSheet.create({
	text: { opacity: 0.7, textAlign: "center", marginTop: theme.spacing.lg },
	image: { marginTop: theme.spacing.xl },
});

export default SearchState;
