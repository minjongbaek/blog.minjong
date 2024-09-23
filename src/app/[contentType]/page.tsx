import ContentCard from "@/components/ContentCard";
import { getPages } from "@/notion";
import { ContentType } from "@/types/content";

export const revalidate = 300;

export const dynamicParams = true;

export const generateStaticParams = async () => {
  return ["post", "note"].map((contentType) => ({
    contentType,
  }));
};

const ContentsPage = async ({
  params,
}: {
  params: { contentType: ContentType };
}) => {
  const { contentType } = params;
  const contents = await getPages({ type: contentType });

  return (
    <>
      <h2 className="py-4 text-lg font-semibold">
        {contentType === "post" ? "작성한 글" : "작성한 메모"}
      </h2>
      <div className="flex flex-col gap-y-6">
        {contents.map((content) => (
          <ContentCard key={content.id} {...content} />
        ))}
      </div>
    </>
  );
};

export default ContentsPage;
