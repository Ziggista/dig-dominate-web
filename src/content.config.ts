import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const devlog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/devlog' }),
  schema: z.object({
    number: z.number().int().positive(),
    title: z.string(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    date: z.coerce.date(),
    summary: z.string(),
    build: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { devlog };
