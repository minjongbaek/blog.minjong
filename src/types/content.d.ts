export interface Content {
  id: string;
  title: string;
  description: string;
  tags: string[];
  createdAt: number;
  type: ContentType;
}
