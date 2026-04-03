import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const pieces = await getCollection('writing', ({ data }) => data.status !== 'draft');
  const sorted = pieces.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  return rss({
    title: 'potpuoy',
    description: 'A site about hidden structure — in systems, ideas, tools, and life.',
    site: context.site!,
    items: sorted.map((piece) => ({
      title: piece.data.title,
      description: piece.data.summary,
      pubDate: piece.data.date,
      link: `/writing/${piece.id}/`,
    })),
    customData: '<language>en-us</language>',
  });
}
