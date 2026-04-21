import ScrollProgressBar from "@/components/ScrollProgressBar";
import { contentMap } from "@/contents/content-map";
import { ContentType } from "@/types/content";
import { getAllContentMetadata } from "@/utils/content";
import { Metadata } from "next";

const loadContent = (type: ContentType, slug: string) => {
  const decodedSlug = decodeURIComponent(slug);
  const loader = contentMap[type]?.[decodedSlug];

  if (!loader) {
    throw new Error(`Content not found: ${type}/${decodedSlug}`);
  }

  return loader();
};

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ type: ContentType; slug: string }>;
}): Promise<Metadata> => {
  const { type, slug } = await params;

  const { metadata } = await loadContent(type, slug);

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

  const { default: Post, metadata } = await loadContent(type, slug);

  return (
    <>
      <ScrollProgressBar />
      <div className="mt-6 mb-10 flex flex-col items-center gap-8">
        <h1 className="text-center break-keep">{metadata.title}</h1>
        <div className="text-gray-500 dark:text-gray-300">
          {new Date(metadata.createdAt).toLocaleDateString("ko-KR")}
        </div>
        <div className="markdown-content">
          <Post />
        </div>
      </div>
    </>
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

export default ContentDetailPage;
