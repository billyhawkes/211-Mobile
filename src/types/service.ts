import z from "zod";

export const ServiceSchema = z.object({
    id: z.number(),
    CurrentId: z.number(),
    ParentId: z.number(),
    Description: z.string(),
    Distance: z.number(),
    Email: z.string(),
    Hours: z.string(),
    Hours2: z.string(),
    Latitude: z.number(),
    Longitude: z.number(),
    MailingAddressCity: z.string(),
    MailingAddressCountry: z.string(),
    MailingAddressPostalCode: z.string(),
    MailingAddressProvince: z.string(),
    MailingAddressStreet1: z.string(),
    MailingAddressStreet2: z.string(),
    MailingAttentionName: z.string(),
    MaxAge: z.string(),
    MinAge: z.string(),
    PhoneNumbers: z
        .object({
            Description: z.string(),
            Name: z.string(),
            Phone: z.string(),
            Type: z.string(),
        })
        .array()
        .nullable(),
    PhysicalAddressCity: z.string(),
    PhysicalAddressCountry: z.string(),
    PhysicalAddressPostalCode: z.string(),
    PhysicalAddressProvince: z.string(),
    PhysicalAddressStreet1: z.string(),
    PhysicalAddressStreet2: z.string(),
    PublicName: z.string(),
    RecordOwner: z.string(),
    Score: z.number(),
    ServiceArea: z.string().array(),
    UpdatedOn: z.string().nullable(),
    Website: z.string().url().nullable(),
});

export type Service = z.infer<typeof ServiceSchema>;
