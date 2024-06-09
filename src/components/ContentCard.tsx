import { Content } from "@/types/content";

interface Props extends Content {}

const ContentCard = ({
  id,
  title,
  description,
  tags,
  createdAt,
  type,
}: Props) => {
  const isPostType = type === "post";

  return (
    <a href={`/${type}/${id}`} className="inline-block text-current group">
      <div className="flex flex-col w-full gap-1">
        <div className="text-sm text-slate-500">
          {new Date(createdAt).toLocaleDateString("ko-KR")}
        </div>
        {isPostType && (
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
        {isPostType && (
          <div className="leading-4 text-md mt-0.5">{description}</div>
        )}
      </div>
    </a>
  );
};

export default ContentCard;
