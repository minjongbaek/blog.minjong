import PostItem from "./PostItem";
import type { CollectionEntry } from "astro:content";

type PostListType = {
  posts: CollectionEntry<"post">[];
};

const PostList = ({ posts }: PostListType) => {
  return (
    <div className="flex flex-col gap-y-6 my-4">
      {posts.map((post) => (
        <PostItem key={post.id} slug={post.slug} post={post.data} />
      ))}
    </div>
  );
};

export default PostList;
