import { ContentMetadata, ContentSummary, ContentType } from "@/types/content";
import fs from "fs";
import path from "path";

const CONTENTS_DIRECTORY = path.join(process.cwd(), "src/contents");

export const getAllContentMetadata = (contentType: ContentType) => {
  const contentTypeDirectory = path.join(CONTENTS_DIRECTORY, contentType);

  const contentDirectories = fs
    .readdirSync(contentTypeDirectory, {
      withFileTypes: true,
    })
    .filter((node) => node.isDirectory())
    .map((node) => node.name);

  const contents: ContentSummary[] = contentDirectories
    .map((contentDirectory) => {
      const metadata = require(
        `../contents/${contentType}/${contentDirectory}/index.mdx`,
      ).metadata as ContentMetadata;

      return {
        ...metadata,
        slug: contentDirectory,
        type: contentType,
      };
    })
    .sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  return contents;
};
