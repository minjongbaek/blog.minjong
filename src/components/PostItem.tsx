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
    <a href={slug}>
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold">{title}</h2>
        <div className="text-base text-slate-500">
          {date.toLocaleDateString("ko-KR")}
        </div>
        <p className="text-base">{description}</p>
        <TagList tags={tags} />
      </div>
    </a>
  );
};

export default PostItem;
