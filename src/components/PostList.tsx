import PostItem from '~/components/PostItem';
import type { Post } from '~/types/post.types';

type PostListProps = {
  posts: Post[];
};

const PostList = ({ posts }: PostListProps) => {
  return (
    <div className="flex flex-col space-y-6">
      {posts.map(({ node: { id, frontmatter } }) => (
        <PostItem key={id} link="https://google.com" {...frontmatter} />
      ))}
    </div>
  );
};

export default PostList;
