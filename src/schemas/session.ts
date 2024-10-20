import { z } from "zod";

export const sessionSchema = z.object({
  did: z.string(),
  accessJwt: z.string(),
  refreshJwt: z.string(),
  service: z
    .object({
      id: z.string(),
      type: z.string(),
      serviceEndpoint: z.string(),
    })
    .array()
    .nonempty(),
});

export type Session = z.infer<typeof sessionSchema>;
