import { z } from "zod";
import { followSchema } from "./follow.ts";
import { subjectSchema } from "./subjectSchema.ts";

export const getFollowersSchema = z.object({
  followers: z.array(followSchema),
  subject: subjectSchema,
  cursor: z.string().optional(),
});

export type FollowersData = z.infer<typeof getFollowersSchema>;
