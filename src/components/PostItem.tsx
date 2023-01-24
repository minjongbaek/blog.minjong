import { GatsbyImage } from 'gatsby-plugin-image';
import type { Post } from '~/types/post.types';

type PostItemProps = Post['node']['frontmatter'] & {
  link: string;
};

const PostItem = ({
  title,
  date,
  tags,
  summary,
  thumbnail: {
    childImageSharp: { gatsbyImageData },
  },
  link,
}: PostItemProps) => {
  return (
    <a href={link}>
      <div className="flex flex-col">
        <div className="flex items-center gap-4 p-2">
          <div className="w-48">
            <GatsbyImage image={gatsbyImageData} alt="Post Thumbnail" />
          </div>
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
