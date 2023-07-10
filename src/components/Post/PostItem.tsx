import type { CollectionEntry } from "astro:content";
import TagList from "./TagList";

type PostItemProps = {
  slug: string;
  post: CollectionEntry<"post">["data"];
};

const PostItem = ({ slug, post: { title, date, tags, description, thumbnail } }: PostItemProps) => {
  return (
    <a href={`/post/${slug}`} className="inline-block text-current group">
      <div className="flex flex-col sm:flex-row sm:gap-4 items-center border border-slate-300 sm:border-none p-4 sm:p-0">
        <div className="bg-white sm:border border-slate-300 dark:border-none rounded-xl sm:w-48 w-full sm:h-48 h-32 flex-shrink-0 grid place-items-center select-none">
          <div className="text-black text-2xl text-center break-keep font-bold group-hover:text-blue-500 transition-colors duration-300">
            {thumbnail}
          </div>
        </div>
        <div className="flex flex-col w-full gap-2">
          <TagList tags={tags} />
          <h1 className="text-4xl font-semibold inline-block group-hover:text-blue-500 transition-colors duration-300 break-keep">
            {title}
          </h1>
          <p className="text-base">{description}</p>
          <div className="text-sm text-slate-500">{date.toLocaleDateString("ko-KR")}</div>
        </div>
      </div>
    </a>
  );
};

export default PostItem;