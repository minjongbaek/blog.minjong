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
    <div className="flex flex-col gap-8">
      <h1 className="text-lg font-semibold">
        {title} {`(${contentsMetadata.length})`}
      </h1>
      <div className="flex flex-col gap-8">
        {contentsMetadata.map((content) => (
          <ContentCard key={content.slug} {...content} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
