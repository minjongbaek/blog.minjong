import { CONTENT_KEYS } from "@/enum/content";
import { Content } from "@/types/content";
import { NotionAPI } from "notion-client";
import { getPageProperty } from "notion-utils";

const DATABASE_ID = "b110ffc4f30f4792820bd895191a52f1";

const client = new NotionAPI({ authToken: process.env.NOTION_TOKEN });

export const getAllPages = async () => {
  const response = await client.getPage(DATABASE_ID);

  const views = Object.values(response.collection_query)[0];
  const pageIds = Object.values(views).flatMap<string>((view: any) =>
    view?.collection_group_results?.blockIds?.map((blockId: string) => blockId)
  );

  const result = pageIds.map((id) => {
    const content: Partial<Content> = { id };
    CONTENT_KEYS.forEach((key) => {
      const block = response.block[id].value;
      const property = getPageProperty(key, block, response);
      content[key] = property;
    });
    return content;
  });

  return result.filter(isContent);
};

const isContent = (content: Partial<Content>): content is Content => {
  return (
    typeof content.id === "string" &&
    typeof content.title === "string" &&
    typeof content.description === "string" &&
    Array.isArray(content.tags) &&
    typeof content.createdAt === "number" &&
    typeof content.type === "string"
  );
};

export const getPage = async (id: string) => {
  return await client.getPage(id);
};
