import PostItem from '~/components/PostItem';
import type { PostListQueryResult } from '~/types/graphql.types';

type PostListProps = {
  posts: PostListQueryResult['data']['allMarkdownRemark']['edges'];
};

const PostList = ({ posts }: PostListProps) => {
  return (
    <div className="flex flex-col gap-y-10 my-4">
      {posts.map(
        ({
          node: {
            id,
            fields: { slug },
            frontmatter,
          },
        }) => (
          <PostItem key={id} link={slug} {...frontmatter} />
        )
      )}
    </div>
  );
};

export default PostList;
