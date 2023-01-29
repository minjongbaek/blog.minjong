type TagItemProps = {
  tag: string;
  count?: number;
};

const TagItem = ({ tag, count }: TagItemProps) => {
  return (
    <span className="bg-slate-100 text-sky-500 px-3 rounded-xl hover:text-sky-400">
      <a href={`/tags/${tag}`}>
        {tag} {count && `(${count})`}
      </a>
    </span>
  );
};

export default TagItem;
