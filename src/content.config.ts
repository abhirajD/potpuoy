import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const writing = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/writing' }),
  schema: z.object({
    // Required fields
    title: z.string(),
    date: z.coerce.date(),
    type: z.enum(['essay', 'note', 'synthesis']),
    summary: z.string(),
    tags: z.array(z.string()).min(1).max(4),
    status: z.enum(['draft', 'published', 'evergreen']),
    // Optional fields
    domain: z.array(z.string()).max(2).optional(),
    updated: z.coerce.date().optional(),
  }),
});

export const collections = { writing };
