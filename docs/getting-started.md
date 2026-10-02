# Getting started

clide is a native macOS app: Rust (Tauri) owns the microphone, global
shortcut, provider requests, Accessibility insertion, credentials, and SQLite.
React renders the UI only.

## Run the bundled app (recommended)

Use the bundled app rather than `npm run app` (Tauri dev) for anything
involving permissions. Releases from 2.0.0 on are Developer ID signed and notarized. The older 0.1.2
preview is not, so macOS may require an extra Gatekeeper confirmation. After a
rebuild, Accessibility may need to be granted again. clide needs macOS 13 or later.

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

## Choose an engine

clide runs entirely on your Mac. Use Apple Speech (built in, nothing to install),
or open Models and press Install on the Whisper or Parakeet models you want.
Nothing is downloaded until you do.

Cloud engines were removed in 2.0.0.
