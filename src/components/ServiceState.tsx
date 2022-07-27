import EmptyImage from "@assets/svg/empty-undraw.svg";
import ErrorImage from "@assets/svg/error-undraw.svg";
import NotFoundImage from "@assets/svg/not-found-undraw.svg";
import WaitingToSearchImage from "@assets/svg/waiting-to-search-undraw.svg";
import { ServiceItemSkeleton } from "@components/ServiceItem";
import Text from "@components/ui/Text";
import theme from "@constants/theme";
import { PHONE_211_NUMBER } from "@env";
import useLinkOut from "@hooks/useLinkOut";
import React from "react";
import { StyleSheet, View } from "react-native";

export const Loading = ({ skeletons }: { skeletons: number }) => {
    return (
        <View style={{ paddingHorizontal: theme.spacing.lg }}>
            {[...Array<number>(skeletons)].map((_, index) => (
                <ServiceItemSkeleton key={index} />
            ))}
        </View>
    );
};

export const NotFound = () => {
    const { call } = useLinkOut();
    return (
        <View style={styles.container}>
            <NotFoundImage height={120} />
            <View style={styles.noResultsContainer}>
                <Text type="paragraph">No results found.</Text>
                <Text type="link" onPress={() => call(PHONE_211_NUMBER)}>
                    Try Calling!
                </Text>
            </View>
        </View>
    );
};

export const ErrorFound = () => (
    <View style={styles.container}>
        <ErrorImage height={120} />
        <Text type="paragraph" style={styles.text}>
            Error. Please try again.
        </Text>
    </View>
);

export const Idle = () => (
    <View style={styles.container}>
        <WaitingToSearchImage height={120} />
        <Text type="paragraph" style={styles.text}>
            Waiting to search!
        </Text>
    </View>
);

export const Empty = ({ title }: { title: string }) => (
    <View style={styles.container}>
        <EmptyImage height={120} />
        <Text type="paragraph" style={styles.text}>
            {title}
        </Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        marginTop: theme.spacing.xl,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        marginTop: theme.spacing.sm,
    },
    noResultsContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: theme.spacing.xl,
    },
});
