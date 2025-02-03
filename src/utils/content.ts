import { ContentMetadata, ContentType } from "@/types/content";
import fs from "fs";
import path from "path";

export const getAllContentMetadata = (type: ContentType) => {
  const directoryPath = path.join(process.cwd(), `src/contents/${type}`);
  const fileNames = fs.readdirSync(directoryPath);
  const contents = fileNames
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => {
      const metadata = require(`../contents/${type}/${fileName}`)
        .metadata as ContentMetadata;
      return { ...metadata, fileName: fileName.replace(/\.mdx$/, ""), type };
    })
    .sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  return contents;
};
