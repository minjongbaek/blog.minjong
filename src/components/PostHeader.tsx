import TagList from './TagList';

type PostHeaderProps = {
  title: string;
  date: string;
  tags: string[];
};

const PostHeader = ({ title, date, tags }: PostHeaderProps) => {
  return (
    <div className="flex flex-col items-center gap-4 mt-6 mb-10">
      <h1 className="text-4xl font-semibold">{title}</h1>
      <div className="text-slate-500">{date}</div>
      <TagList tags={tags} />
    </div>
  );
};

export default PostHeader;
