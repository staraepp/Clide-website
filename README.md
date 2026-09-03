# clide — website

Marketing/concept site for **clide**, an open-source, system-wide dictation
app for macOS. Built with Next.js (App Router) + TypeScript, hand-written CSS
(no Tailwind), and a WebGL2 aurora shader in the hero and CTA bands.

This repo is the **website only**. The clide app itself lives at
[staraepp/clide_stt](https://github.com/staraepp/clide_stt).

## Setup

Requirements: Node.js 18.18+ (Next.js 16 requirement) and npm.

```bash
git clone https://github.com/staraepp/Clide-website.git
cd Clide-website
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

If you hit a Turbopack/RSC manifest error on a fresh clone, clear the cache
and run webpack mode instead:

```bash
rm -rf .next
npm run dev -- --webpack
```

### Build for production

```bash
npm run build
npm run start
```

## Project structure

```
app/
  page.tsx           — the entire single-page site (hero, sections, footer)
  layout.tsx          — fonts (Montserrat/DM Sans/Fragment Mono) + metadata
  globals.css         — design system: oceanic color tokens, all component CSS
  privacy/page.tsx     — Privacy Policy
  terms/page.tsx      — Terms of Service
public/
  site.js             — all client interactivity: WebGL aurora shader,
                         scroll reveals, split-word headings, count-up
                         stats, scrollytelling media panel, marquee,
                         mobile menu, copy buttons
docs/                  — project documentation source (see docs/README.md)
```

## Editing

- Copy and layout: edit `app/page.tsx` directly (it's one file by design —
  no component splitting).
- Styling/theme tokens: `app/globals.css` (CSS custom properties at the top).
- Animations/shaders/interactivity: `public/site.js` (plain JS, no bundler
  step — loaded via `<Script src="/site.js">` in `layout.tsx`).

Keep any factual claims about clide (features, providers, privacy behavior)
in sync with the real [clide_stt](https://github.com/staraepp/clide_stt)
README — see `docs/README.md` for the ground-truth policy.

## License

MIT.
