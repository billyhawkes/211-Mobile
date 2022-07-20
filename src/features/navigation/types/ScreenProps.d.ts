import { Service } from "@typesGlobal/service";

export type ScreenProps = {
    Home: undefined;
    Topics: undefined;
    Search: undefined;
    Favourites: undefined;
    Topic: {
        name: string;
    };
    Service: {
        service: Service;
    };
};
