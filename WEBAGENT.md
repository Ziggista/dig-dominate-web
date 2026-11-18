# WEBAGENT.md: handover for whoever works on this site next

This is the public website for **Dig & Dominate**, live at **https://digndom.com**.
Read this before changing anything. `README.md` covers the day-to-day how-to (running it
locally, writing posts, deploy settings). This file covers the rules, the current state and
what is left to do.

Last updated 2026-11-18, after PR #9.

## Rules from the owner (Krystin), do not break these

1. **Name.** The game is always "Dig & Dominate". Never write "Keeper", "KeeperUE5", "UE5" or
   "Unreal" anywhere on the site: page text, file names, metadata, alt text or dev log posts.
   CPU opponents are "CPU rivals", workers are "diggers", and lairs are "lairs".
2. **Clean room.** Use only this project's own art and text. Nothing from the original game it
   was inspired by: no names, art, UI, quotes or numbers copied from it. If a creature name in
   the game matches the original's distinctive name, use a replacement (see "Creature names").
3. **Pre-release lock stays on** until the rights question (game repo issue #3) is resolved.
   Every page carries `noindex`, `robots.txt` blocks all crawlers, and an orange preview banner
   shows. One switch turns all of it off: `hideFromSearch` in `src/site.ts`, plus changing
   `public/robots.txt` to `Allow: /`. Only do this when Krystin says so.
4. **No contact details.** Krystin asked for no developer name or contact email on the site,
   including the press page.
5. **Merging.** Krystin approved Claude opening and merging PRs in this repo itself
   (2026-11-18). There is no CI. Run `npm run build` and check the result yourself before
   merging. Squash-merge, and work on a branch, not on `main`.

## Stack and hosting

- Astro 5.18.2, pinned exactly. Static output, no server and no database. Node 22.
- Cloudflare Pages builds from `main`. Krystin connected it herself. Every merge to `main`
  deploys in a minute or two, and other branches get preview URLs.
  - Build command `npm run build`, output folder `dist`, environment variable `NODE_VERSION=22`.
  - `site` defaults to `https://digndom.com` in `astro.config.mjs`. `SITE_URL` can override it
    but isn't needed.
- Domain: `digndom.com` works. **`www.digndom.com` showed an error page** on 2026-11-18. To fix
  it, add it under Custom domains in the Pages project. Only Krystin can do that.

## What is on the site

| Page | Source | Notes |
|---|---|---|
| `/` game page | `src/pages/index.astro` | Looping video behind the title, feature cards, modes, gallery, latest 3 posts |
| `/creatures/` | `src/pages/creatures.astro`, data in `src/creatures.ts` | 13 creature cards plus the hero line-up strip |
| `/devlog/` and posts | `src/content/devlog/*.md` | Numbered "Dig Log #N" posts with lead images, RSS at `/devlog/rss.xml` |
| `/press/` | `src/pages/press.astro` | Fact sheet, descriptions, logos, screenshot zip |

Shared pieces:
- `src/layouts/Base.astro`: header nav, footer, meta tags, `og:image` (the fight at the heart).
- `src/components/Lightbox.astro`: any `<a href="img" data-lightbox data-caption="...">` opens
  the image full-screen.
- `src/styles/global.css`: all styles, a dark theme with gold accents.

### Media

- `public/video/hero-loop.webm` (VP9) and `.mp4` (H.264): a 720p, 13 s muted ping-pong loop
  under the title. `hero-poster.webp` is the first frame. It is hidden under
  `prefers-reduced-motion`.
- `public/screenshots/*.webp`: gallery images. Sources are the 1080p captures in
  `/mnt/project-files/website/captures/`, taken on Ziggi-PC. Older renders came from
  `/mnt/project-files/` (`creatures_lineup.png`, `heroes_front.png`, `doors-traps.png`).
- `public/creatures/*.webp`: 400x400 crops from `creatures_lineup.png`, in a 7 + 6 grid of
  320 px cells.
- `public/press/dig-and-dominate-screenshots.zip`: 1080p captures, renders and logos. **Rebuild
  it whenever the screenshots change.**
- To get new captures, ask the coordinator to have Ziggi-PC take them: 1920x1080, with no HUD,
  no tutorial text and no debug overlay.

### Dev log posts

Front matter fields: `number` (the next Dig Log number, required), `title`, `date`, `summary`,
optional `build`, `image`, `imageAlt` and `draft`. Posts 1 to 4 cover alpha 6 rc1, rc2 and rc3,
and the first multiplayer build. Write for players, in plain language, and rewrite all internal
names out (see the rules above). Good sources:
- `/mnt/project-files/notes/release-notes-*.md` (already written for players).
- `/mnt/project-files/notes/change-notice-2026-11.md` (internal, so rewrite heavily).
- `/mnt/project-files/notes/multiplayer/storyboard-*.md` (says what is BUILT and what is only
  planned, so don't claim the planned parts).

## Creature names

The game shows each creature as its kind key with a capital first letter (in the game repo,
`unreal/.../KeeperHudModel.cpp`). The site uses those names, except where they match the
original's names:

| Game kind | On site | Why |
|---|---|---|
| beetle, spider, fly, tentacle, ghost, hound, bloat, spawn, skeleton, vampire, reaper | same, capitalised | ordinary words |
| mistress | **Lasher** | matches the original's |
| warlock | **Hexer** | matches the original's |

**Open question for Krystin:** is she happy with Lasher and Hexer? Heroes have no individual
cards yet, because the eight models in `heroes_front.png` couldn't be reliably matched to the
game's hero kinds. Don't publish "Avatar", which is the original's name.

## Ideas not done yet

These are taken from other indie game sites (Factorio, Beyond All Reason, Supergiant, Stardew
Valley, the presskit.gg checklist):
- A proper logo or key art. The current wordmark in `public/logo.svg` is a placeholder.
- Hero cards on `/creatures/`, once the names and better hero renders exist.
- A short FAQ (price, platforms, multiplayer, release date).
- A trailer once one exists, and a store or wishlist button once there is a store page.
- A multiplayer lobby screenshot, and a 3 to 4 lair map shot.
- A roadmap page, if Krystin wants it public.

## Checking your work

```sh
npm install
npm run build                      # must pass
npx astro preview --port 4321      # then check in Playwright or a browser
```

Check 1280 px and 390 px widths with no sideways scroll, and check that images load.
Before merging, search for banned words:
`grep -rniE "keeper|ue5|unreal" src public --include=*.astro --include=*.md --include=*.ts`.
Note that this search won't catch everything, such as text inside images.
