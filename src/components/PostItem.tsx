import type { Frontmatter } from '~/types/graphql.types';

type PostItemProps = Frontmatter & {
  link: string;
};

const PostItem = ({ title, date, tags, summary, link }: PostItemProps) => {
  return (
    <a href={link}>
      <div className="flex flex-col">
        <div className="flex items-center gap-4 p-2">
          <div>
            <h2 className="text-3xl">{title}</h2>
            <p className="text-lg">{summary}</p>
            <ul className="flex gap-2">
              {tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </a>
  );
};

export default PostItem;
