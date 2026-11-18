import type { APIRoute } from 'astro';
import { SITE } from '../../site';
import { getPosts } from '../../posts';

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const GET: APIRoute = async ({ site }) => {
  const base = (site ?? new URL('https://example.com')).toString().replace(/\/$/, '');
  const posts = await getPosts();
  const items = posts
    .map((p) => `    <item>
      <title>${esc(p.data.title)}</title>
      <link>${base}/devlog/${p.id}/</link>
      <guid>${base}/devlog/${p.id}/</guid>
      <pubDate>${p.data.date.toUTCString()}</pubDate>
      <description>${esc(p.data.summary)}</description>
    </item>`)
    .join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${esc(SITE.name)} dev log</title>
    <link>${base}/devlog/</link>
    <description>${esc(SITE.tagline)}</description>
${items}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
};
