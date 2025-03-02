import { ContentSummary } from "@/types/content";
import Link from "next/link";

interface Props extends ContentSummary {}

const ContentCard = (props: Props) => {
  const { slug, title, description, type } = props;

  return (
    <Link href={`/${type}/${slug}`}>
      <div className="flex w-full flex-col gap-2">
        <div className="inline-block break-keep font-semibold leading-5">
          {title}
        </div>
        <div className="mt-0.5 text-sm leading-4 text-gray-500 dark:text-gray-300">
          {description}
        </div>
      </div>
    </Link>
  );
};

export default ContentCard;
