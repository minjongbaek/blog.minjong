import type { Frontmatter } from '~/types/graphql.types';
import TagList from './TagList';

type PostItemProps = Frontmatter & {
  link: string;
};

const PostItem = ({ title, date, tags, summary, link }: PostItemProps) => {
  return (
    <a href={link}>
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold">{title}</h2>
        <div className="text-base text-slate-500">{date}</div>
        <p className="text-base">{summary}</p>
        <TagList tags={tags} />
      </div>
    </a>
  );
};

export default PostItem;
