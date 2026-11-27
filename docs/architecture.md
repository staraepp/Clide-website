# Architecture

Pipeline: `shortcut → capture → transcribe → process → insert → history`

| Layer | Owner | Notes |
|---|---|---|
| Microphone capture | Rust | native audio input |
| Global shortcut | Rust | system-wide hotkey to start/stop dictation |
| Transcription | Rust, behind engine adapters | Apple Speech, local Whisper, local Parakeet. All on-device |
| Processing | Rust | spoken corrections, Verbatim, deterministic Polished, on-device Rewrite (Apple Intelligence or local Ollama) |
| Insertion | Rust | copies every result, targets the original app through Accessibility or Cmd+V |
| History | Rust, SQLite + FTS5 | text only; temporary audio is deleted when the transaction resolves |
| UI | React | presentation only, no native access |

The local model manager offers 33 canonical whisper.cpp GGML weights and six
Parakeet builds. The user chooses which to install; nothing downloads until they
press Install. Downloads stream to partial files, verify expected size, and
only become installed after an atomic rename.

Live typing exists for Apple Speech only. Not yet implemented (do not advertise
as shipping): file imports, per-app profiles, context reading beyond the
developer vocabulary setting, or a customizable dashboard grid.

_(Expand with module/crate breakdown, IPC boundary between Rust and React,
and the provider adapter trait as the codebase solidifies.)_

## Whisper cold start on Apple Silicon

Whisper already used Metal for inference. Clide 2.1.3 ships a precompiled
`default.metallib` and loads it in place of compiling the Metal shader source
at runtime. The measurements below are from an M2 Pro.

| Measurement | Time |
|---|---|
| Metal library load | 11.3 s → about 0.001 s |
| App model load | About 9.45 s → about 0.98 s |
| Warm-up inference | About 0.91 s |
| Transcription of a later 7.8 s dictation | About 0.44 s |

The first two rows measure cold start. The last two are separate inference
measurements. See the [Clide 2.1.3 release notes](https://github.com/staraepp/clide_stt/releases/tag/v2.1.3).
