import { ContentSummary } from "@/types/content";
import Link from "next/link";

interface Props extends ContentSummary {}

const ContentCard = (props: Props) => {
  const { slug, title, description, createdAt, tags, type } = props;
  const isArticle = type === "article";

  return (
    <Link href={`/${type}/${slug}`} className="group inline-block text-current">
      <div className="flex w-full flex-col gap-1">
        <div className="text-sm text-slate-500">
          {new Date(createdAt).toLocaleDateString("ko-KR")}
        </div>
        {isArticle && (
          <div className="flex items-center gap-4 text-sm">
            {tags.map((tag) => (
              <span className="text-orange-500" key={tag}>
                #{tag}
              </span>
            ))}
          </div>
        )}
        <div className="inline-block break-keep text-lg font-semibold leading-5 transition-colors duration-300 group-hover:text-orange-500">
          {title}
        </div>
        {isArticle && (
          <div className="text-md mt-0.5 leading-4">{description}</div>
        )}
      </div>
    </Link>
  );
};

export default ContentCard;
