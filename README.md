# AI Sales Voice: landing page

Static Astro site built from `handoff.md` / `Main.dc.html`. Zero client JS.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs to dist/
npm run preview
```

## Changing content

- **All placeholders** (company name, contact details, booking link, site URL, competitor, photo alt text and captions, package prices): `src/config/site.ts`
- **Photos**: replace `src/assets/photos/{problem,how,headshot}.jpg` (any size; Astro crops and resizes to WebP), then update `photos` alt text in `site.ts`
- **OG image**: `public/og.jpg` (1200×630), currently a placeholder crop
- `site.url` is the production domain (`https://thirteenblackbird.com`); canonical, sitemap, robots.txt, llms.txt and JSON-LD all read from it.

## Generated SEO / AEO files

- `/sitemap-index.xml` (`@astrojs/sitemap`)
- `/robots.txt` (allows GPTBot, ClaudeBot, PerplexityBot, Google-Extended and others): `src/pages/robots.txt.ts`
- `/llms.txt` (built from `site.ts`): `src/pages/llms.txt.ts`
- JSON-LD `ProfessionalService` + one `Service` per package: `src/layouts/Base.astro`

## Deploying to Cloudflare Pages

Static output, so no adapter is needed. In the Pages dashboard (Workers & Pages → Create → Pages → connect the Git repo):

| Setting | Value |
| --- | --- |
| Framework preset | Astro |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | *(blank)* |

- **Node version** is pinned by `.node-version` (22.16.0). Pages ignores `engines` in `package.json`, and Astro 7 needs Node ≥ 22.12.
- **Headers**: `public/_headers` adds basic security headers and long-term caching for the hashed files in `/_astro/`.
- **Custom domain**: add `thirteenblackbird.com` under the project's Custom domains. To send `www.` to the bare domain, add `www` there too and create a Cloudflare Bulk Redirect (a `_redirects` file can't redirect between hostnames).
