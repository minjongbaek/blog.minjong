import { ContentType } from "@/types/content";
import { getAllContentMetadata } from "@/utils/content";
import Link from "next/link";

const HomePage = async ({
  params,
}: {
  params: Promise<{ type: ContentType }>;
}) => {
  const { type } = await params;

  const contentsMetadata = await getAllContentMetadata(type);

  const pageTitle = type === "article" ? "작성한 글" : "작성한 메모";

  return (
    <div className="space-y-6">
      <h1 className="text-lg font-semibold">
        {pageTitle} {`(${contentsMetadata.length})`}
      </h1>
      <ul className="flex flex-col gap-6">
        {contentsMetadata.map(({ slug, title, description }) => (
          <li key={slug} className="w-full space-y-1">
            <Link href={`/${type}/${slug}`} className="break-keep leading-7">
              {title}
            </Link>
            <div className="mt-0.5 text-sm leading-4 text-gray-500 dark:text-gray-300">
              {description}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const generateStaticParams = () => {
  return [{ type: "article" }, { type: "note" }];
};

export const dynamicParams = false;

export default HomePage;
