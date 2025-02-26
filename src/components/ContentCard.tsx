import { ContentSummary } from "@/types/content";
import Link from "next/link";

interface Props extends ContentSummary {}

const ContentCard = (props: Props) => {
  const { slug, title, description, type } = props;
  const isArticle = type === "article";

  return (
    <Link href={`/${type}/${slug}`}>
      <div className="flex w-full flex-col gap-2">
        <div className="inline-block break-keep text-lg font-semibold leading-5">
          {title}
        </div>
        <div className="text-md mt-0.5 leading-4 text-slate-500">
          {description}
        </div>
      </div>
    </Link>
  );
};

export default ContentCard;
