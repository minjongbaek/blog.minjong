type TagItemProps = {
  tag: string;
};

const TagItem = ({ tag }: TagItemProps) => {
  return <span className="text-blue-600 dark:text-blue-500">#{tag}</span>;
};

export default TagItem;
