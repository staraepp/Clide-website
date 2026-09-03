# Architecture

Pipeline: `shortcut → capture → transcribe → process → insert → history`

| Layer | Owner | Notes |
|---|---|---|
| Microphone capture | Rust | native audio input |
| Global shortcut | Rust | system-wide hotkey to start/stop dictation |
| Transcription | Rust, behind provider adapters | Apple Speech, five cloud providers, local Whisper, local Parakeet |
| Processing | Rust | Verbatim, deterministic Polished, on-device Apple Intelligence Rewrite |
| Insertion | Rust | copies every result, targets the original app through Accessibility or Cmd+V |
| History | Rust, SQLite + FTS5 | text only; temporary audio is deleted when the transaction resolves |
| Credentials | user-only local file | bring-your-own-key; never SQLite, UI state, history, or logs |
| UI | React | presentation only, no native access |

The local model manager offers 33 canonical whisper.cpp GGML weights and three
Parakeet builds. Downloads stream to partial files, verify expected size, and
only become installed after an atomic rename.

Not yet implemented (do not advertise as shipping): file imports, per-app
profiles, context reading, streaming transcription, or a customizable dashboard
grid.

_(Expand with module/crate breakdown, IPC boundary between Rust and React,
and the provider adapter trait as the codebase solidifies.)_
