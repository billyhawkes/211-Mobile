type UserLocation = {
    longitude: number;
    latitude: number;
};

type ServiceResponse = {
    RecordCount: string;
    Records: Service[];
};

type Service = {
    CurrentId: number;
    Description: string;
    Distance: number;
    Email: string;
    Hours: string;
    Hours2: string;
    Latitude: number;
    Longitude: number;
    MailingAddressCity: string;
    MailingAddressCountry: string;
    MailingAddressPostalCode: string;
    MailingAddressProvince: string;
    MailingAddressStreet1: string;
    MailingAddressStreet2: string;
    MailingAttentionName: string;
    MaxAge: string;
    MinAge: string;
    ParentId: number;
    PhoneNumbers: {
        Description: string;
        Name: string;
        Phone: string;
        Type: string;
    }[];
    PhysicalAddressCity: string;
    PhysicalAddressCountry: string;
    PhysicalAddressPostalCode: string;
    PhysicalAddressProvince: string;
    PhysicalAddressStreet1: string;
    PhysicalAddressStreet2: string;
    PublicName: string;
    RecordOwner: string;
    Score: number;
    ServiceArea: string[];
    UpdatedOn: string;
    Website: string;
    id: number;
};

type ScreenParameters = {
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
