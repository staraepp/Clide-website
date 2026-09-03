# Getting started

clide is a native macOS app: Rust (Tauri) owns the microphone, global
shortcut, provider requests, Accessibility insertion, credentials, and SQLite.
React renders the UI only.

## Run the bundled app (recommended)

Use the bundled app rather than `npm run app` (Tauri dev) for anything
involving permissions. The public preview is currently ad-hoc signed, so macOS
may require an extra Gatekeeper confirmation and Accessibility may need to be
granted again after a rebuild.

```
npm install
npm run app:build -- --debug --bundles app
open src-tauri/target/debug/bundle/macos/clide.app
```

## Fork it

```
git clone https://github.com/staraepp/clide_stt clide
cd clide
```

## Set up a provider

Choose Apple Speech for a built-in on-device engine, download one of 33 local
Whisper or three local Parakeet models, or add your own key for Groq, OpenAI,
Deepgram, ElevenLabs, or AssemblyAI.

Cloud credentials are stored in a user-only local file with mode `0600`. They
never enter SQLite, frontend-persisted state, transcript history, or logs. This
is weaker than macOS Keychain storage and is intended to return to Keychain once
Clide ships with a stable Developer ID identity.

After onboarding, use Models to choose an engine/model and Settings →
Transcription to configure any required cloud credential.
