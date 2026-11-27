# Getting started

clide is a native macOS app: Rust (Tauri) owns the microphone, global
shortcut, provider requests, Accessibility insertion, credentials, and SQLite.
React renders the UI only.

## Download

- **macOS 2.1.3:** [Apple Silicon DMG](https://github.com/staraepp/clide_stt/releases/download/v2.1.3/clide_2.1.3_aarch64.dmg), for macOS 13 and later. The DMG is Developer ID signed, notarized, and stapled. SHA-256: `9bb1326c2fe8272de3c44571980ce3b8af92cb268ffdd3e12cd65bea950bdfdd`.
- **Windows 2.1.2:** [Standard and CUDA x64 installers](https://github.com/staraepp/clide_stt/releases/tag/v2.1.2). The 2.1.3 release ships only the macOS installer.

## Build and run the bundled app on macOS

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
