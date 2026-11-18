import { getCollection } from 'astro:content';

export async function getPosts() {
  const posts = await getCollection('devlog', ({ data }) => !data.draft);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export function formatDate(d: Date) {
  return d.toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
}
