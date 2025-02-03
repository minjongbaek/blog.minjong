export type ContentType = "post" | "note";

export interface ContentMetadata {
  title: string;
  description?: string;
  tags: string[];
  createdAt: string;
}
