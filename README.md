# Digital Strategist Portfolio

Next.js (App Router) portfolio site. No CSS framework, no extra dependencies — just `next`, `react`, `react-dom`.

## Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Fill in your details

**Almost everything lives in one file: [`content/site.js`](content/site.js).**
Replace every `[PLACEHOLDER]` in it — name, headline, stats, services,
case studies, about, testimonials, writing links, contact. The pages read
from it, so you never have to touch the layout code.

A few bits of intro copy live directly in [`app/page.js`](app/page.js) — search for `[INTRO:`.

## Images

Drop files into `/public` and reference them with a leading slash:

| What | Put it here | Referenced in `site.js` as |
|---|---|---|
| Your portrait | `public/portrait.jpg` | `site.portrait` |
| Case study covers | `public/work/case-one.jpg` | `work[].cover` |
| Client logos | `public/logos/acme.svg` | `clients.items[].src` |
| Link preview (1200×630) | `public/og.jpg` | automatic |
| Your CV | `public/Your-Name-CV.pdf` | `site.resume` |

Until a file exists, that slot shows a labelled placeholder box instead of a
broken image — so the site looks fine while you're still filling it in.

## Adding a case study

Add an object to the `work` array in `content/site.js`. The `slug` becomes the
URL (`/work/your-slug`) and the page is generated automatically.

## Colours & type

All in the `:root` block at the top of [`app/globals.css`](app/globals.css).
Change `--accent` for your brand colour; dark mode adapts automatically via the
`@media (prefers-color-scheme: dark)` block just below.

## Deploy to Vercel

1. Push this folder to a new GitHub repo.
2. Go to [vercel.com/new](https://vercel.com/new), import the repo.
3. Framework preset auto-detects as **Next.js** — accept the defaults and Deploy.

You'll get a free `*.vercel.app` URL immediately.

### When you buy a domain

1. Vercel project → **Settings → Domains** → add your domain.
2. Point the DNS records Vercel shows you at your registrar (or transfer the
   domain to Vercel to skip that).
3. Update `site.url` in `content/site.js` to `https://yourdomain.com` so the
   sitemap and link previews use the real address.

## Also worth doing later

- Add real analytics (Vercel Analytics is one click in the dashboard).
- Swap the `mailto:` contact for a form (Formspree, Tally, or a Vercel route).
