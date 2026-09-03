# clide docs

This folder is the source of truth for clide's documentation. It's separate
from the marketing site in `app/` — write here, and wire pages into the site
(or a docs generator) later as needed.

## Structure

- `getting-started.md` — install and run clide locally
- `architecture.md` — how the Rust/React/Tauri pieces fit together
- `providers.md` — transcription providers and how the adapter works
- `faq.md` — common questions

## Ground truth

Keep facts here in sync with the real repo:
https://github.com/staraepp/clide_stt

Do not restate claims the README doesn't back up (e.g. release cadence,
language counts, or providers that aren't implemented yet). If something is
"on the roadmap," say so explicitly instead of implying it already ships.
