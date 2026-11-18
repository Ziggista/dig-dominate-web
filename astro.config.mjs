// @ts-check
import { defineConfig } from 'astro/config';

// Set SITE_URL in Cloudflare Pages once the real domain is known.
export default defineConfig({
  site: process.env.SITE_URL || 'https://dig-dominate.pages.dev',
  output: 'static',
});
