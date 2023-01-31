type TagItemProps = {
  tag: string;
  count?: number;
};

const TagItem = ({ tag, count }: TagItemProps) => {
  return (
    <span className="text-magenta rounded-xl hover:text-rose-600">
      <a href={`/tags/${tag}`}>
        #{tag} {count && `(${count})`}
      </a>
    </span>
  );
};

export default TagItem;
