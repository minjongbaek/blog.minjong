import { Content, ContentType } from "@/types/content";
import { Client, isFullPage } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import rehypeStringify from "rehype-stringify";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeShiki from "@shikijs/rehype";
import { unified } from "unified";

const notionClient = new Client({
  auth: process.env.NOTION_TOKEN,
});

const n2m = new NotionToMarkdown({ notionClient });

export const getPages = async ({
  type,
  pageSize,
}: {
  type: ContentType;
  pageSize?: number;
}) => {
  const contents: Content[] = [];
  const response = await notionClient.databases.query({
    database_id: "b110ffc4f30f4792820bd895191a52f1",
    filter: {
      property: "type",
      select: {
        equals: type,
      },
    },
    sorts: [{ property: "createdAt", direction: "descending" }],
    page_size: pageSize,
  });

  response.results.forEach((result) => {
    if (isFullPage(result)) {
      const { title, description, tags, createdAt } = result.properties;
      const content = {
        id: result.id,
        title: title.type === "title" ? title.title[0]?.plain_text : "",
        description:
          description.type === "rich_text"
            ? description.rich_text[0]?.plain_text
            : "",
        tags:
          tags.type === "multi_select"
            ? tags.multi_select.map((tag) => tag.name)
            : [],
        createdAt:
          createdAt.type === "date" && createdAt.date
            ? createdAt.date.start
            : "",
        type,
      };

      if (!content.title || !content.description || !content.createdAt) {
        return;
      }

      contents.push(content);
    }
  });

  return contents;
};

export const getPageProperty = async ({ id }: { id: string }) => {
  const result = await notionClient.pages.retrieve({ page_id: id });

  if (isFullPage(result)) {
    const { title, description, tags, createdAt } = result.properties;
    const content = {
      id: result.id,
      title: title.type === "title" ? title.title[0].plain_text : "",
      description:
        description.type === "rich_text"
          ? description.rich_text[0]?.plain_text
          : "",
      tags:
        tags.type === "multi_select"
          ? tags.multi_select.map((tag) => tag.name)
          : [],
      createdAt:
        createdAt.type === "date" && createdAt.date ? createdAt.date.start : "",
    };
    return content;
  } else {
    throw new Error(`Not Found Page - ${id}`);
  }
};

export const getPageContent = async ({ id }: { id: string }) => {
  const markdownBlocks = await n2m.pageToMarkdown(id);
  const markdownString = n2m.toMarkdownString(markdownBlocks);

  const { value: htmlContent } = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkBreaks)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeShiki, {
      themes: {
        light: "vitesse-light",
        dark: "vitesse-dark",
      },
    })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(markdownString.parent);

  return htmlContent;
};
