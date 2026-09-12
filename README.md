# Digital Strategist Portfolio

Next.js (App Router) portfolio site. No CSS framework, no extra dependencies —
just `next`, `react`, `react-dom`.

## Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Pages

| URL | What it is | Source |
|---|---|---|
| `/` | The landing. A hook with one hanging bag per case study — nothing else. Each bag links into its case study. | [`app/page.js`](app/page.js) |
| `/story` | The profile told as narrative chapters, plus services, toolbox, testimonials and writing. | [`app/story/page.js`](app/story/page.js) |
| `/work/[slug]` | One page per case study, generated from the `work` array. | [`app/work/[slug]/page.js`](app/work/%5Bslug%5D/page.js) |
| `/contact` | Email and social links. | [`app/contact/page.js`](app/contact/page.js) |

`/sitemap.xml` and `/robots.txt` are generated automatically.

## Fill in your details

**Almost everything lives in one file: [`content/site.js`](content/site.js).**
Replace every `[PLACEHOLDER]` — name, headline, story chapters, case studies,
services, testimonials, writing links, contact. The pages read from it, so you
never have to touch layout code.

Two things to know:

- **The headline is split in two.** `hero.headline` renders plain, and
  `hero.headlineAccent` renders in coral italic straight after it. Put the
  words you want emphasised in the second field.
- **Story chapters** each take a heading, an array of body paragraphs, and an
  optional `pull` quote. Set `pull: null` to skip the quote for that chapter.

## The hanging bags

The landing hook grows a prong per case study, **capped at 4**. Add a case
study to `work` and a bag appears — nothing to edit in
[`components/HangingBags.js`](components/HangingBags.js).

Bag labels use each item's `client` field once it's a real name, and fall back
to "Client 1", "Client 2"… while the placeholders are still in place. Only the
first two words fit on a bag.

## Adding a case study

Add an object to the `work` array in `content/site.js`. The `slug` becomes the
URL (`/work/your-slug`), the page is generated, a bag appears on the landing,
and it joins the "next case study" loop.

Keep `metrics[].value` short — they render at up to 68px in the coral results
band, so `-38%` and `3.1x` work well and `$1.2M in pipeline` will wrap badly.

## Images

Drop files into `/public` and reference them with a leading slash:

| What | Put it here | Referenced in `site.js` as |
|---|---|---|
| Your portrait | `public/portrait.jpg` | `site.portrait` |
| Case study covers | `public/work/case-one.jpg` | `work[].cover` |
| Client logos | `public/logos/acme.svg` | `clients.items[].src` |
| Link preview (1200×630) | `public/og.jpg` | automatic |
| Your CV | `public/Your-Name-CV.pdf` | `site.resume` |

Until a file exists, that slot shows a labelled placeholder instead of a broken
image, so the site looks intentional while you're still filling it in.

Note the design is dark. Screenshots with white backgrounds will punch bright
holes in the page — prefer dark visuals, or crop tight.

## Colours & type

All in the `:root` block at the top of [`app/globals.css`](app/globals.css).
Change `--accent` and the whole site re-skins — it drives the headline italics,
the coral bands, the buttons and the outlined numerals.

The site is dark-only by design; there is no light theme.

## Motion

Deliberately minimal. The only continuous animation is the swaying bags on the
landing; everything else is hover-only. All of it is disabled under
`prefers-reduced-motion: reduce`.

## Deploy to Vercel

1. Push this repo to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and import it.
3. Framework preset auto-detects as **Next.js** — accept the defaults, Deploy.

You'll get a free `*.vercel.app` URL immediately.

### When you buy a domain

1. Vercel project → **Settings → Domains** → add your domain.
2. Point the DNS records Vercel shows you at your registrar (or transfer the
   domain to Vercel to skip that).
3. Update `site.url` in `content/site.js` to `https://yourdomain.com` so the
   sitemap and link previews use the real address.

Until then `site.url` is a placeholder, and the code falls back to
`http://localhost:3000` rather than breaking the build on an invalid URL.

## Also worth doing later

- Add analytics (Vercel Analytics is one click in the dashboard).
- Swap the `mailto:` contact for a form (Formspree, Tally, or a route handler).
