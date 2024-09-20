import { Content } from "@/types/content";

export const CONTENT_TYPE = {
  POST: "post",
  NOTE: "note",
} as const;

export type ContentType = (typeof CONTENT_TYPE)[keyof typeof CONTENT_TYPE];

export const CONTENT_KEYS: (keyof Omit<Content, "id">)[] = [
  "title",
  "description",
  "tags",
  "createdAt",
  "type",
] as const;

export type ContentKey = (typeof CONTENT_KEYS)[number];
