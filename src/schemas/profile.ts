import { z } from "zod";

export const profileSchema = z.object({
  did: z.string().startsWith("did:plc:"),
  handle: z.string(),
  displayName: z.string(),
  avatar: z.string().url(),
  associated: z.object({
    lists: z.number().int(),
    feedgens: z.number().int(),
    starterPacks: z.number().int(),
    labeler: z.boolean(),
    chat: z.object({
      allowIncoming: z.enum(["following"]),
    }),
  }),
  viewer: z.object({
    muted: z.boolean(),
    blockedBy: z.boolean(),
    knownFollowers: z.object({
      count: z.number().int(),
      followers: z.array(z.any()), // TODO: populate this when searching for other profiles
    }),
  }),
  labels: z.array(z.any()), // TODO: check labels api
  createdAt: z.string().datetime(),
  description: z.string(),
  indexedAt: z.string().datetime(),
  banner: z.string().url(),
  followersCount: z.number().int(),
  followsCount: z.number().int(),
  postsCount: z.number().int(),
});

export type Profile = z.infer<typeof profileSchema>;
