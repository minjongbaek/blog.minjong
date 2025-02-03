import { ContentMetadata } from "@/types/content";
import fs from "fs";
import path from "path";

export const getAllContentMetadata = (type: "posts" | "notes") => {
  const directoryPath = path.join(process.cwd(), `src/contents/${type}`);
  const fileNames = fs.readdirSync(directoryPath);
  const contents = fileNames
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => {
      const { metadata } = require(`../contents/${type}/${fileName}`);
      return metadata as ContentMetadata;
    });
  return contents;
};
