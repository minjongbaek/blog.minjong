import { getCollection, type CollectionEntry } from "astro:content";

type GetPosts = (count?: number) => Promise<CollectionEntry<"post">[]>;

export const getPosts: GetPosts = async (count = 0) => {
  return (await getCollection("post"))
    .slice(count * -1)
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
};
