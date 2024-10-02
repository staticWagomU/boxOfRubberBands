import { defineCollection, z } from "astro:content";

const blogCollection = defineCollection({
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    // Transform string to Date object
    pubDate: z.date().transform((val) => new Date(val)),
    updatedDate: z.date().optional(),
    heroImage: z.string().optional(),
    tags: z.array(z.string()).optional(),
    published: z.boolean(),
  }),
});

export const collections = <const>{
  blog: blogCollection,
};
