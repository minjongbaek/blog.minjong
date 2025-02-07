import { ContentSummary } from "@/types/content";
import Link from "next/link";

interface Props extends ContentSummary {}

const ContentCard = (props: Props) => {
  const { slug, title, description, createdAt, tags, type } = props;
  const isArticle = type === "article";

  return (
    <Link href={`/${type}/${slug}`} className="inline-block text-current group">
      <div className="flex flex-col w-full gap-1">
        <div className="text-sm text-slate-500">
          {new Date(createdAt).toLocaleDateString("ko-KR")}
        </div>
        {isArticle && (
          <div className="flex gap-4 items-center text-sm">
            {tags.map((tag) => (
              <span className="text-orange-500" key={tag}>
                #{tag}
              </span>
            ))}
          </div>
        )}
        <div className="inline-block text-lg font-semibold group-hover:text-orange-500 transition-colors duration-300 break-keep leading-5">
          {title}
        </div>
        {isArticle && (
          <div className="leading-4 text-md mt-0.5">{description}</div>
        )}
      </div>
    </Link>
  );
};

export default ContentCard;
