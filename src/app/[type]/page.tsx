import ContentCard from "@/components/ContentCard";
import { ContentType } from "@/types/content";
import { getAllContentMetadata } from "@/utils/content";

const HomePage = async ({
  params,
}: {
  params: Promise<{ type: ContentType }>;
}) => {
  const { type } = await params;

  if (type !== "article" && type !== "note") {
    return <div>Not Found</div>;
  }

  const contentsMetadata = getAllContentMetadata(type);

  const title = type === "article" ? "작성한 글" : "작성한 메모";

  return (
    <div className="mt-4 w-full space-y-8 leading-6">
      <div className="space-y-2">
        <h2 className="py-2 text-lg font-semibold">
          {title} {`(${contentsMetadata.length})`}
        </h2>
        <div className="flex flex-col gap-y-6">
          {contentsMetadata.map((content) => (
            <ContentCard key={content.slug} {...content} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
