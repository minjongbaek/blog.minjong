import TagItem from './TagItem';

type TagListProps = {
  tags: string[];
};

const TagList = ({ tags }: TagListProps) => {
  return (
    <ul className="flex gap-2">
      {tags.map((tag) => (
        <TagItem tag={tag} />
      ))}
    </ul>
  );
};

export default TagList;
