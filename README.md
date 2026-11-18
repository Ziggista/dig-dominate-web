# Dig & Dominate website

The public site for **Dig & Dominate**: a game page and a dev log. It is a static
[Astro](https://astro.build) site with no database and no server code, built to deploy on
Cloudflare Pages.

> Pre-release: every page carries `noindex` and `robots.txt` blocks crawlers. Before launch,
> set `hideFromSearch: false` in `src/site.ts` and change `public/robots.txt` to `Allow: /`.

## Run it locally

Needs Node 22 (see `.nvmrc`).

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # writes the site to dist/
npm run preview  # serves dist/
```

## Write a dev log post

Add a Markdown file to `src/content/devlog/`. The file name becomes the URL, so
`2026-12-01-new-traps.md` is served at `/devlog/2026-12-01-new-traps/`.

```md
---
title: New traps
date: 2026-12-01
build: alpha 7 rc1        # optional tag shown next to the title
summary: One or two sentences for the list page and RSS feed.
draft: false              # optional; true hides the post
---

Body in plain Markdown.
```

Posts are sorted newest first on `/devlog/`, the three newest show on the home page, and
all of them appear in the RSS feed at `/devlog/rss.xml`.

Writing rules: plain language for players, the game is always called "Dig & Dominate",
and only the game's own text and art goes on the site.

## Screenshots

Put images in `public/screenshots/` and list them in the `shots` array in
`src/pages/index.astro`. Until then the page shows labelled placeholders.

## Deploy on Cloudflare Pages

1. In the Cloudflare dashboard go to **Workers & Pages > Create > Pages > Connect to Git** and pick
   the `dig-dominate-web` repository.
2. Build settings:
   - Framework preset: **Astro**
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Root directory: leave empty
3. Environment variables (Production and Preview):
   - `NODE_VERSION` = `22`
   - `SITE_URL` = the site's final address, for example `https://dig-dominate.pages.dev` or a
     custom domain. It is used for links in the RSS feed.
4. Save and deploy. Every push to `main` deploys production, and every other branch or pull
   request gets its own preview URL.
5. Optional: add a custom domain under the project's **Custom domains** tab.

## Layout

```
src/
  site.ts                 site name, tagline, pre-release switch
  content.config.ts       dev log collection schema
  content/devlog/*.md     dev log posts
  layouts/Base.astro      header, footer, meta tags
  pages/index.astro       game page
  pages/devlog/           post list, post pages, RSS feed
  styles/global.css       all styles
public/                   favicon, robots.txt, screenshots
```
