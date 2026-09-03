# Getting started

clide is a native macOS app: Rust (Tauri) owns the microphone, global
shortcut, provider requests, Accessibility insertion, Keychain, and SQLite.
React renders the UI only.

## Run the bundled app (recommended)

Use the bundled app rather than `npm run app` (Tauri dev) for anything
involving permissions — macOS grants microphone and Accessibility access to
a bundle identity, and the dev binary doesn't have a stable one.

```
npm install
npm run app:build -- --debug --bundles app
open src-tauri/target/debug/bundle/macos/Clide.app
```

## Fork it

```
git clone https://github.com/staraepp/clide_stt clide
cd clide
```

## Set up a provider

clide currently transcribes through Groq (`whisper-large-v3-turbo` or
`whisper-large-v3`) behind a provider adapter. Add your own Groq API key —
it's stored in the macOS Keychain, never in a config file.

_(Fill in exact settings screen / key entry flow here once documented.)_
