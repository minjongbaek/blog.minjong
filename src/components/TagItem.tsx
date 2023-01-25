type TagItemProps = {
  tag: string;
};

const TagItem = ({ tag }: TagItemProps) => {
  return (
    <li className="bg-slate-100 text-sky-500 px-3 mx-0.5 rounded-xl hover:text-sky-400">
      {tag}
    </li>
  );
};

export default TagItem;
