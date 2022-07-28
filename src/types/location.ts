import { z } from "zod";

export const UserLocationSchema = z.object({
    lat: z.number(),
    lng: z.number(),
});

export type UserLocation = z.infer<typeof UserLocationSchema>;
