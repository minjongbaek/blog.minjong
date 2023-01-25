type PostHeaderProps = {
  title: string;
  date: string;
  tags: string[];
};

const PostHeader = ({ title, date, tags }: PostHeaderProps) => {
  return (
    <div className="flex flex-col items-center gap-4 my-6">
      <h1 className="text-4xl font-semibold">{title}</h1>
      <div className="text-slate-500">{date}</div>
      <div>
        <ul className="flex gap-2">
          {tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PostHeader;
