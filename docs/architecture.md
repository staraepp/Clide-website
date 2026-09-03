# Architecture

Pipeline: `shortcut → capture → transcribe → process → insert → history`

| Layer | Owner | Notes |
|---|---|---|
| Microphone capture | Rust | native audio input |
| Global shortcut | Rust | system-wide hotkey to start/stop dictation |
| Transcription | Rust, behind a provider adapter | currently Groq only |
| Processing | Rust, local & deterministic | Verbatim or Polished — no LLM rewrite |
| Insertion | Rust | Accessibility API, falls back to clipboard paste + restore |
| History | Rust, SQLite + FTS5 | text only, audio never stored |
| Credentials | macOS Keychain | bring-your-own-key |
| UI | React | presentation only, no native access |

Not yet implemented (do not advertise as shipping): file imports, local
models, per-app profiles, LLM rewrite, a customizable dashboard grid.

_(Expand with module/crate breakdown, IPC boundary between Rust and React,
and the provider adapter trait as the codebase solidifies.)_
