# clide — website

Marketing site for **clide**, an open-source, 100% local, system-wide
dictation app for macOS and Windows. Built with Next.js 16 (App Router), React 19 and
TypeScript, CSS Modules, [Motion](https://motion.dev) for animation, and a
WebGL2 wave shader behind the hero.

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
app/                 routes: home, docs, changelog, privacy, terms, cookies,
                     accessibility, and the 404 page
components/          UI, one component per file with its own CSS Module
  app-window/        the interactive replica of the clide window in the hero
  Pipeline*.tsx      the scroll-pinned "how it works" scene
  ModelsRail.tsx     the scroll-pinned horizontal models rail
  ShaderField.tsx    WebGL2 background (tiered quality, pauses off-screen)
lib/site.ts          release version, download URL, checksum, notarization flag
docs/                project documentation source (see docs/README.md)
```

## Editing

- **Releasing a new build:** publish the installers on GitHub Releases, then update
  `RELEASE` in `lib/site.ts` with each installer’s URL, size, and SHA-256.
- **Motion:** scroll-linked effects use `motion/react`. Everything respects
  `prefers-reduced-motion` (the shader shows a still frame, demos stop, and
  scroll-pinned scenes stay readable).
- **Legal pages:** `app/privacy`, `app/terms`, `app/cookies` and
  `app/accessibility` state what the site and app actually do. Update them in
  the same change as any behaviour that affects them (for example, adding
  analytics would require changes to Privacy and Cookies first).

Keep any factual claims about clide in sync with the real
[clide_stt](https://github.com/staraepp/clide_stt) README. See
`docs/README.md` for the ground-truth policy.

## License

MIT. See [LICENSE](LICENSE). The license covers this website's source code; the
Clide app itself is licensed separately in
[clide_stt](https://github.com/staraepp/clide_stt).
