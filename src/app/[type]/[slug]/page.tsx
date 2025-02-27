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
    <div className="mb-10 mt-6 flex flex-col items-center gap-4">
      <h1 className="break-keep text-center text-2xl font-bold">
        {metadata.title}
      </h1>
      <div className="text-slate-500">
        {new Date(metadata.createdAt).toLocaleDateString("ko-KR")}
      </div>
      <div className="markdown-content mb-8 space-y-4">
        <Post />
      </div>
    </div>
  );
};

export const generateStaticParams = () => {
  const contentTypes: ContentType[] = ["article", "note"];

  return contentTypes
    .flatMap((type) => getAllContentMetadata(type))
    .map(({ type, slug }) => ({
      type,
      slug,
    }));
};

export const dynamicParams = false;

export default ContentDetailPage;
