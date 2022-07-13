import theme from "../../constants/theme";
import { Text, StyleSheet, Pressable, View } from "react-native";
import NotFoundImage from "../../assets/svg/not-found-undraw.svg";
import WaitingToSearchImage from "../../assets/svg/waiting-to-search-undraw.svg";
import ErrorImage from "../../assets/svg/error-undraw.svg";
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
					<View style={styles.noResultsContainer}>
						<Text style={[theme.textVariants.md, styles.text, { marginTop: 0 }]}>
							No results found.
						</Text>
						<Pressable>
							<Text style={[theme.textVariants.md, styles.link]}>Try Calling!</Text>
						</Pressable>
					</View>
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
	text: { opacity: 0.7, textAlign: "center", marginTop: theme.spacing.xl },
	image: { marginTop: theme.spacing.xl3 },
	link: {
		textDecorationLine: "underline",
		color: theme.colors.link,
		textAlign: "center",
		marginLeft: 4,
	},
	noResultsContainer: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		marginTop: theme.spacing.xl,
	},
});

export default SearchState;
