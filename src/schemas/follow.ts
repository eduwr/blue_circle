import { z } from "zod";

const viewerSchema = z.object({
  muted: z.boolean(),
  blockedBy: z.boolean(),
  following: z.string().startsWith("at://did:plc:").optional(),
  followedBy: z.string().startsWith("at://did:plc:").optional(),
});

const associatedSchema = z.object({
  chat: z
    .object({
      allowIncoming: z.string(),
    })
    .optional(),
});

export const followSchema = z.object({
  did: z.string(),
  handle: z.string(),
  displayName: z.string().optional(),
  avatar: z.string().url().optional(),
  associated: associatedSchema.optional(),
  viewer: viewerSchema,
  createdAt: z.string().datetime(),
  description: z.string().optional(),
  indexedAt: z.string().datetime(),
});

const subjectSchema = z.object({
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

export const getFollowsSchema = z.object({
  follows: z.array(followSchema),
  subject: subjectSchema,
  cursor: z.string().optional(),
});

export type FollowsData = z.infer<typeof getFollowsSchema>;
