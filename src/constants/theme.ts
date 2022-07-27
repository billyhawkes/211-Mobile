const pallete = {
    primary: "#2179BE",
    background: "#FFFFFF",
    text: "#333",
    border: "#ccc",
};

const theme = {
    colors: {
        primary: pallete.primary,
        background: pallete.background,
        text: pallete.text,
        border: pallete.border,
    },
    spacing: {
        sm: 8,
        md: 12,
        lg: 16,
        xl: 24,
        xl2: 32,
        xl3: 48,
    },
    textVariants: {
        default: {
            fontFamily: "Lato",
            fontSize: 14,
            lineHeight: 20,
        },
        link: {
            fontFamily: "Lato",
            fontSize: 14,
            lineHeight: 20,
            color: "blue",
        },
        paragraph: {
            fontFamily: "Lato",
            fontSize: 12,
            lineHeight: 16,
            opacity: 0.6,
        },
        header: {
            fontFamily: "Lato",
            fontSize: 16,
            lineHeight: 24,
        },
        title: {
            fontFamily: "Lato",
            fontSize: 16,
            lineHeight: 24,
            textAlign: "center",
            marginVertical: 16,
        },
    },
};

export type Theme = typeof theme;

export default theme;
