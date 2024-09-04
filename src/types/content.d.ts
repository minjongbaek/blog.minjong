export type ContentType = "post" | "note";

export interface Content {
  id: string;
  title: string;
  description: string;
  tags: string[];
  createdAt: string;
  type: ContentType;
}
