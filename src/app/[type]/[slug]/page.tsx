import { ContentType } from "@/types/content";
import { getAllContentMetadata } from "@/utils/content";
import { Metadata } from "next";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ type: ContentType; slug: string }>;
}): Promise<Metadata> => {
  const { type, slug } = await params;

  const { metadata } = await import(`@/contents/${type}/${slug}/index.mdx`);

  return {
    title: `${metadata.title} | Blog.minjong`,
    description: metadata.description,
  };
};

const ContentDetailPage = async ({
  params,
}: {
  params: Promise<{ type: ContentType; slug: string }>;
}) => {
  const { type, slug } = await params;

  const { default: Post, metadata } = await import(
    `@/contents/${type}/${slug}/index.mdx`
  );

  return (
    <div className="mt-6 mb-10 flex flex-col items-center gap-8">
      <h1 className="text-center break-keep">{metadata.title}</h1>
      <div className="text-gray-500 dark:text-gray-300">
        {new Date(metadata.createdAt).toLocaleDateString("ko-KR")}
      </div>
      <div className="markdown-content">
        <Post />
      </div>
    </div>
  );
};

export const generateStaticParams = async () => {
  const contentTypes: ContentType[] = ["article", "note"];

  const allContentMetadata = (
    await Promise.all(contentTypes.map((type) => getAllContentMetadata(type)))
  ).flat();

  return allContentMetadata.map(({ type, slug }) => ({
    type,
    slug,
  }));
};

export const dynamicParams = false;

export default ContentDetailPage;
