# Dig & Dominate website

The public site for **Dig & Dominate**, currently a single "Coming soon" page. It is a static
[Astro](https://astro.build) site with no database and no server code, built to deploy on
Cloudflare Pages.

> Pre-release: every page carries `noindex` and `robots.txt` blocks crawlers. Before launch,
> set `hideFromSearch: false` in `src/site.ts` and change `public/robots.txt` to `Allow: /`.

See `WEBAGENT.md` for the rules, current state and open work.

## Run it locally

Needs Node 22 (see `.nvmrc`).

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # writes the site to dist/
npm run preview  # serves dist/
```

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
     custom domain. It is used for links in the RSS feed. Defaults to https://digndom.com.
4. Save and deploy. Every push to `main` deploys production, and every other branch or pull
   request gets its own preview URL.
5. Optional: add a custom domain under the project's **Custom domains** tab.

## Layout

The site is currently a single "Coming soon" page (`src/pages/index.astro`) over the
looping video in `public/video/`. The full site (game page, creatures, dev log, press kit)
is in git history at commit `4a10ca0`. See `WEBAGENT.md`.
