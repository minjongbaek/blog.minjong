import { defineCollection, z } from "astro:content";

const post = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
    date: z.string().transform((str) => new Date(str)),
  }),
});

export const collections = { post };
