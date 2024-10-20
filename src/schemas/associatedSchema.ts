import { z } from "zod";

export const associatedSchema = z.object({
  chat: z
    .object({
      allowIncoming: z.string(),
    })
    .optional(),
});
