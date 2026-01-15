import { getAllContentMetadata } from "@/utils/content";
import Link from "next/link";

const HomePage = async () => {
  const [articles, notes] = await Promise.all([
    getAllContentMetadata("article"),
    getAllContentMetadata("note"),
  ]);

  const recentArticles = articles.slice(0, 3);
  const recentNotes = notes.slice(0, 3);

  return (
    <div className="flex flex-col gap-12">
      <p>
        개발하면서 겪은 경험들을 간단한 메모부터 자세한 글까지 다양한 형태로
        이곳에 기록하고 있습니다.
      </p>

      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold">최근 글</h2>
        <ul className="flex flex-col gap-4">
          {recentArticles.map(({ slug, title, description }) => (
            <li key={slug} className="space-y-1">
              <Link href={`/article/${slug}`} className="break-keep">
                {title}
              </Link>
              {description && (
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  {description}
                </p>
              )}
            </li>
          ))}
        </ul>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold">최근 메모</h2>
        <ul className="flex flex-col gap-4">
          {recentNotes.map(({ slug, title, description }) => (
            <li key={slug} className="space-y-1">
              <Link href={`/note/${slug}`} className="break-keep">
                {title}
              </Link>
              {description && (
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  {description}
                </p>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default HomePage;
