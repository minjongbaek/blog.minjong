import type { CollectionEntry } from "astro:content";
import TagList from "./TagList";

type PostItemProps = {
  slug: string;
  post: CollectionEntry<"post">["data"];
};

const PostItem = ({
  slug,
  post: { title, date, tags, description },
}: PostItemProps) => {
  return (
    <div className="flex flex-col">
      <div className="text-base text-slate-500 text-sm">
        {date.toLocaleDateString("ko-KR")}
      </div>
      <a href={`/${slug}`} className="mb-1 inline-block">
        <h2 className="text-2xl font-semibold inline-block">{title}</h2>
      </a>
      <p className="text-base mb-1">{description}</p>
      <TagList tags={tags} />
    </div>
  );
};

export default PostItem;
