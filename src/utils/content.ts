import { ContentMetadata, ContentSummary, ContentType } from "@/types/content";
import { ResumeContentMetadata, ResumeContentType } from "@/types/resume";
import fs from "fs";
import path from "path";

const CONTENTS_DIRECTORY = path.join(process.cwd(), "src/contents");

export const getResumeContents = async (
  resumeContentType: ResumeContentType,
) => {
  const contentTypeDirectory = path.join(
    CONTENTS_DIRECTORY,
    "resume",
    resumeContentType,
  );

  const fileNames = fs.readdirSync(contentTypeDirectory);

  const contents = await Promise.all(
    fileNames.map(async (fileName) => {
      const content = await import(
        `../contents/resume/${resumeContentType}/${fileName}`
      );

      return {
        Content: content.default,
        metadata: content.metadata as ResumeContentMetadata,
      };
    }),
  );

  contents.sort(
    (a, b) =>
      new Date(b.metadata.startDate).getTime() -
      new Date(a.metadata.startDate).getTime(),
  );

  return contents;
};

export const getAllContentMetadata = async (contentType: ContentType) => {
  const contentTypeDirectory = path.join(CONTENTS_DIRECTORY, contentType);

  const contentDirectories = fs
    .readdirSync(contentTypeDirectory, { withFileTypes: true })
    .filter((node) => node.isDirectory())
    .map((node) => node.name);

  const contents: ContentSummary[] = await Promise.all(
    contentDirectories.map(async (contentDirectory) => {
      const metadata = (
        await import(`../contents/${contentType}/${contentDirectory}/index.mdx`)
      ).metadata as ContentMetadata;

      return {
        ...metadata,
        slug: contentDirectory,
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
