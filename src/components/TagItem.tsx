type TagItemProps = {
  tag: string;
  count?: number;
};

const TagItem = ({ tag, count }: TagItemProps) => {
  return (
    <span>
      <a className="" href={`/tags/${tag}`}>
        #{tag} {count && `(${count})`}
      </a>
    </span>
  );
};

export default TagItem;
