import TagItem from "./TagItem";

type TagListProps = {
  tags: string[];
};

const TagList = ({ tags }: TagListProps) => {
  return (
    <div className="flex gap-4">
      {tags.map((tag) => (
        <TagItem tag={tag} key={tag} />
      ))}
    </div>
  );
};

export default TagList;