import { z } from "zod";
import { associatedSchema } from "./associatedSchema";

export const subjectSchema = z.object({
  did: z.string(),
  handle: z.string(),
  displayName: z.string(),
  avatar: z.string().url().optional(),
  associated: associatedSchema.optional(),
  viewer: z.object({
    muted: z.boolean(),
    blockedBy: z.boolean(),
  }),
  labels: z.array(z.string()),
  createdAt: z.string().datetime(),
  description: z.string(),
  indexedAt: z.string().datetime(),
});
