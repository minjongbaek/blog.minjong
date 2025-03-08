import { ContentType } from "@/types/content";
import { getAllContentMetadata, groupContentsByYear } from "@/utils/content";
import Link from "next/link";

const HomePage = async ({
  params,
}: {
  params: Promise<{ type: ContentType }>;
}) => {
  const { type } = await params;

  const contentsMetadata = await getAllContentMetadata(type);
  const contentsByYear = groupContentsByYear(contentsMetadata);
  const years = Object.keys(contentsByYear).sort(
    (a, b) => Number(b) - Number(a),
  );

  const pageTitle = type === "article" ? "작성한 글" : "작성한 메모";

  return (
    <div className="space-y-6">
      <h1 className="text-lg font-semibold">
        {pageTitle} {`(${contentsMetadata.length})`}
      </h1>
      {years.map((year) => (
        <div key={year} className="flex gap-6">
          <div>{year}</div>
          <ul className="flex flex-col gap-6">
            {contentsByYear[year].map(({ slug, title, description }) => (
              <li key={slug} className="w-full space-y-2">
                <Link href={`/${type}/${slug}`} className="break-keep">
                  {title}
                </Link>
                <div className="mt-0.5 text-sm leading-4 text-gray-500 dark:text-gray-300">
                  {description}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export const generateStaticParams = () => {
  return [{ type: "article" }, { type: "note" }];
};

export const dynamicParams = false;

export default HomePage;
