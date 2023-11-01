import { defineCollection, z } from "astro:content";

const post = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
    date: z.date(),
    draft: z.boolean().optional().default(false),
  }),
});

const experience = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    startDate: z.date(),
    endDate: z.date().optional(),
    skills: z.array(z.string()).optional(),
    github: z.string().optional(),
    link: z.string().optional(),
  }),
});

const note = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
    date: z.date(),
    draft: z.boolean().optional().default(false),
  }),
});

export const collections = { post, experience, note };
