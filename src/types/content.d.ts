export type ContentType = "article" | "note";

export interface ContentMetadata {
  title: string;
  description?: string;
  tags: string[];
  createdAt: string;
}

export interface ContentSummary extends ContentMetadata {
  fileName: string;
  type: ContentType;
}
