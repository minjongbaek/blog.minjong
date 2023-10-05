import { getCollection, type CollectionEntry } from "astro:content";

type CollectionName = "post" | "note";

type GetContentsParameters<T extends CollectionName> = {
  collectionName: T;
  count?: number;
};

export const getContents = async <T extends CollectionName>({
  collectionName,
  count = 0,
}: GetContentsParameters<T>): Promise<CollectionEntry<T>[]> => {
  return (await getCollection(collectionName))
    .slice(count * -1)
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
};
