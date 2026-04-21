import { contentMap } from "@/contents/content-map";
import { ContentMetadata, ContentSummary, ContentType } from "@/types/content";

export const getAllContentMetadata = async (contentType: ContentType) => {
  const entries = contentMap[contentType] ?? {};

  const contents: ContentSummary[] = await Promise.all(
    Object.entries(entries).map(async ([slug, loader]) => {
      const metadata = (await loader()).metadata as ContentMetadata;

      return {
        ...metadata,
        slug,
        type: contentType,
      };
    }),
  );

  contents.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  return contents;
};

export const groupContentsByYear = (contents: ContentSummary[]) => {
  const contentsByYear: Record<string, ContentSummary[]> = {};

  contents.forEach((content) => {
    const year = new Date(content.createdAt).getFullYear().toString();

    if (!contentsByYear[year]) {
      contentsByYear[year] = [];
    }

    contentsByYear[year].push(content);
  });

  return contentsByYear;
};
