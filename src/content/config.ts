import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z.date().transform((val) => new Date(val)),
		updatedDate: z.date().transform((val) => new Date(val)).optional(),
		heroImage: z.string().optional(),
    tags: z.array(z.string()).optional(),
	}),
});

export const collections = <const>{
  blog: blogCollection,
};
