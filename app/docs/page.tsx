import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Docs — clide",
  description:
    "How clide works: installing, permissions, engines, local models, processing modes, and what to do when insertion misses.",
};

const SECTIONS = [
  { id: "what-it-is", label: "What clide is" },
  { id: "install", label: "Install" },
  { id: "permissions", label: "Permissions" },
  { id: "engines", label: "Engines" },
  { id: "models", label: "Local models" },
  { id: "modes", label: "Processing modes" },
  { id: "shortcut", label: "The shortcut" },
  { id: "insertion", label: "How text lands" },
  { id: "privacy", label: "Privacy" },
  { id: "troubleshooting", label: "Troubleshooting" },
];

export default function DocsPage() {
  return (
    <main className="container docs-shell">
      <nav className="docs-nav" aria-label="Documentation sections">
        <Link href="/" className="legal-back">← Back to clide</Link>
        <p className="docs-nav-label" style={{ marginTop: 20 }}>On this page</p>
        <ol>
          {SECTIONS.map((section) => (
            <li key={section.id}>
              <a href={`#${section.id}`}>{section.label}</a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="docs-body">
        <h1 className="t-h1">Documentation</h1>
        <p className="legal-updated">For clide 0.1.2 · macOS on Apple Silicon</p>

        <section id="what-it-is">
          <h2>What clide is</h2>
          <p>
            clide is a dictation utility for macOS. You hold a shortcut, speak,
            and the text appears in whatever app you were already typing in.
            Rust owns the microphone, the shortcut, transcription, and
            insertion; React only draws the window.
          </p>
          <p>
            It is free and MIT licensed, and there is no account. You either use
            a model that runs on your own Mac, or you paste in your own API key
            and the audio goes straight from you to that provider.
          </p>
        </section>

        <section id="install">
          <h2>Install</h2>
          <p>
            Download the DMG from{" "}
            <a href="https://github.com/staraepp/clide_stt/releases/latest" target="_blank" rel="noreferrer">
              the latest release
            </a>{" "}
            and drag clide into Applications. Apple Silicon only.
          </p>
          <div className="docs-note">
            <p>
              Preview builds are signed with an Apple Development certificate,
              not Developer ID, and are not notarized. macOS will show a
              Gatekeeper warning on a Mac other than the one that built it. Open
              it once from the right-click menu to get past that.
            </p>
          </div>
          <h3>Or build it yourself</h3>
          <pre><code>{`git clone https://github.com/staraepp/clide_stt clide
cd clide
npm install
npm run app:build -- --debug --bundles app
open src-tauri/target/debug/bundle/macos/clide.app`}</code></pre>
          <p>
            Use the bundled app rather than <code>npm run app</code>. Permissions
            are granted to a signed bundle, and the dev binary is not one.
          </p>
        </section>

        <section id="permissions">
          <h2>Permissions</h2>
          <p>
            clide asks for each permission at the moment it first needs it,
            never all at once on launch.
          </p>
          <table className="docs-table">
            <thead>
              <tr><th>Permission</th><th>What it is for</th></tr>
            </thead>
            <tbody>
              <tr><td>Microphone</td><td>Recording while you hold the shortcut.</td></tr>
              <tr><td>Accessibility</td><td>Typing the transcript into other apps.</td></tr>
              <tr><td>Speech Recognition</td><td>Only for Apple Speech. macOS treats this as separate consent even though recognition is on-device.</td></tr>
            </tbody>
          </table>
        </section>

        <section id="engines">
          <h2>Engines</h2>
          <p>
            Eight transcription engines, and switching between them never
            changes anything else about your setup.
          </p>
          <table className="docs-table">
            <thead>
              <tr><th>Engine</th><th>Runs</th><th>Needs</th></tr>
            </thead>
            <tbody>
              <tr><td>Apple Speech</td><td>On your Mac</td><td>Nothing — ships with macOS</td></tr>
              <tr><td>Local Whisper</td><td>On your Mac</td><td>A downloaded model</td></tr>
              <tr><td>Local Parakeet</td><td>On your Mac</td><td>A downloaded model</td></tr>
              <tr><td>Groq</td><td>Cloud</td><td>Your API key</td></tr>
              <tr><td>OpenAI</td><td>Cloud</td><td>Your API key</td></tr>
              <tr><td>Deepgram</td><td>Cloud</td><td>Your API key</td></tr>
              <tr><td>ElevenLabs</td><td>Cloud</td><td>Your API key</td></tr>
              <tr><td>AssemblyAI</td><td>Cloud</td><td>Your API key</td></tr>
            </tbody>
          </table>
          <p>
            If your engine fails, clide will not quietly send your recording to a
            different cloud vendor. By default it falls back only to a local
            engine, and whatever ran is named in the HUD. Cloud-to-cloud
            failover exists but is off until you turn it on.
          </p>
        </section>

        <section id="models">
          <h2>Local models</h2>
          <p>
            36 models — 33 Whisper builds and 3 Parakeet — from about 32 MB to
            3.1 GB. You pick from a list; there are no file paths to manage.
          </p>
          <p>
            The Models page ranks them for <em>your</em> Mac. It reads your chip
            and memory, and the stars come from that plus the model&apos;s own
            declared class. There is no popularity score — clide has no
            telemetry and could not know one.
          </p>
          <h3>Which to start with</h3>
          <ul>
            <li><strong>Apple Speech</strong> — nothing to download. Try this first.</li>
            <li><strong>Whisper Large v3 Turbo, compressed</strong> — the best trade in the catalogue: Turbo&apos;s accuracy at roughly a third of the size.</li>
            <li><strong>Parakeet</strong> — very fast, and strong on conversational speech.</li>
          </ul>
          <p>
            Downloads stream to a partial file and only become installed after
            an atomic rename, so an interrupted download can never be mistaken
            for a working model.
          </p>
        </section>

        <section id="modes">
          <h2>Processing modes</h2>
          <table className="docs-table">
            <thead>
              <tr><th>Mode</th><th>What it does</th></tr>
            </thead>
            <tbody>
              <tr><td>Verbatim</td><td>Your words as spoken. Spacing is tidied, nothing else.</td></tr>
              <tr><td>Polished</td><td>Local cleanup — fillers, stutters, spacing, capitalisation. No model, no added delay.</td></tr>
              <tr><td>Rewrite</td><td>Apple Intelligence turns spoken phrasing into written prose, on device.</td></tr>
            </tbody>
          </table>
          <div className="docs-note">
            <p>
              Rewrite runs the deterministic cleanup first and only then asks the
              model. If Apple Intelligence is off or still downloading, you get
              the polished transcript — never nothing. Refinement is never
              allowed to cost you words you already said.
            </p>
          </div>
        </section>

        <section id="shortcut">
          <h2>The shortcut</h2>
          <p>
            One shortcut, and you choose how it behaves:{" "}
            <strong>hold to talk</strong>, or <strong>press once to start and
            again to stop</strong>. The default is <code>⌥ .</code>
          </p>
          <p>
            While recording, a small HUD appears near the bottom of the screen.
            It never takes keyboard focus, so your caret stays exactly where you
            left it.
          </p>
        </section>

        <section id="insertion">
          <h2>How text lands</h2>
          <p>
            Every transcript is copied to the clipboard first. That happens
            before any insertion is attempted, so if everything else fails your
            words are still one paste away.
          </p>
          <p>Then clide tries, in order:</p>
          <ul>
            <li><strong>Accessibility</strong> — writes straight into the focused control, and <em>verifies</em> the text actually changed rather than trusting the API&apos;s success code.</li>
            <li><strong>Typing</strong> — sends the text as Unicode keystrokes. This is what reaches Electron and Chromium apps.</li>
            <li><strong>Paste</strong> — a synthetic ⌘V, as a last resort.</li>
          </ul>
        </section>

        <section id="privacy">
          <h2>Privacy</h2>
          <ul>
            <li>Recordings are temporary and deleted once the transcription resolves. History stores text, never audio.</li>
            <li>History is a local SQLite database on your Mac, searchable with full-text search.</li>
            <li>API keys live in a user-only file (mode <code>0600</code>) — never in the database, the UI, or logs.</li>
            <li>Cloud requests go from your machine straight to the provider. There is no clide server in between.</li>
            <li>With a local model or Apple Speech, nothing leaves your Mac at all.</li>
          </ul>
        </section>

        <section id="troubleshooting">
          <h2>Troubleshooting</h2>

          <h3>System Settings shows Accessibility on, but clide says it is not granted</h3>
          <p>
            Both are telling the truth. macOS ties the grant to the app&apos;s
            code signature, and a rebuilt preview build has a new one, so the
            switch you see belongs to a version that no longer exists. Use{" "}
            <strong>Repair access</strong> in Settings, which clears the stale
            record and asks macOS to register the running build.
          </p>

          <h3>Dictation works, but nothing appears in one particular app</h3>
          <p>
            Some apps — Electron and Chromium ones especially — report that they
            accepted the text and then discard it. clide now checks whether the
            text actually changed and falls through to typing when it did not.
            If an app still refuses everything, the transcript is on your
            clipboard: paste it.
          </p>

          <h3>Rewrite says unavailable</h3>
          <p>
            Apple Intelligence needs to be switched on in System Settings, on
            Apple Silicon, running macOS 26 or later. The engine list in
            Settings → Rewrite says which requirement is missing.
          </p>

          <h3>Something else</h3>
          <p>
            Open an issue at{" "}
            <a href="https://github.com/staraepp/clide_stt/issues" target="_blank" rel="noreferrer">
              github.com/staraepp/clide_stt/issues
            </a>. Settings → About has a copyable build number — including it
            makes the report far easier to act on.
          </p>
        </section>
      </div>
    </main>
  );
}
