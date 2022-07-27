import EmptyImage from "@assets/svg/empty-undraw.svg";
import ErrorImage from "@assets/svg/error-undraw.svg";
import NotFoundImage from "@assets/svg/not-found-undraw.svg";
import WaitingToSearchImage from "@assets/svg/waiting-to-search-undraw.svg";
import { ServiceItemSkeleton } from "@components/ServiceItem";
import theme from "@constants/theme";
import { PHONE_211_NUMBER } from "@env";
import useLinkOut from "@hooks/useLinkOut";
import React from "react";
import { Text, StyleSheet, Pressable, View } from "react-native";

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
        <>
            <NotFoundImage width="100%" height={120} style={styles.image} />
            <View style={styles.noResultsContainer}>
                <Text
                    style={[
                        theme.textVariants.md,
                        styles.text,
                        { marginTop: 0 },
                    ]}
                >
                    No results found.
                </Text>
                <Pressable onPress={() => call(PHONE_211_NUMBER)}>
                    <Text style={[theme.textVariants.md, styles.link]}>
                        Try Calling!
                    </Text>
                </Pressable>
            </View>
        </>
    );
};

export const ErrorFound = () => (
    <>
        <ErrorImage width="100%" height={120} style={styles.image} />
        <Text style={[theme.textVariants.md, styles.text]}>
            Error. Please try again.
        </Text>
    </>
);

export const Idle = () => (
    <>
        <WaitingToSearchImage width="100%" height={120} style={styles.image} />
        <Text style={[theme.textVariants.md, styles.text]}>
            Waiting to search!
        </Text>
    </>
);

export const Empty = ({ title }: { title: string }) => (
    <>
        <EmptyImage width="100%" height={120} style={styles.image} />
        <Text style={[theme.textVariants.md, styles.text]}>{title}</Text>
    </>
);

const styles = StyleSheet.create({
    text: { opacity: 0.7, textAlign: "center", marginTop: theme.spacing.xl },
    image: { marginTop: theme.spacing.xl },
    link: {
        textDecorationLine: "underline",
        color: theme.colors.link,
        textAlign: "center",
        paddingVertical: theme.spacing.md,
        paddingHorizontal: theme.spacing.sm,
    },
    noResultsContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: theme.spacing.xl,
    },
});
