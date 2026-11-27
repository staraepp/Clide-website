import type { Metadata } from "next";
import Link from "next/link";
import { CodeBlock } from "@/components/CodeBlock";
import { DocsNav } from "@/components/DocsNav";
import { PageShell } from "@/components/PageShell";
import { ISSUES_URL, LEGACY, RELEASE, RELEASES_URL } from "@/lib/site";
import styles from "./docs.module.css";

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
  { id: "whisper-startup", label: "Whisper startup" },
  { id: "models", label: "Local models" },
  { id: "modes", label: "Processing modes" },
  { id: "shortcut", label: "The shortcut" },
  { id: "live", label: "Live typing" },
  { id: "corrections", label: "Spoken corrections" },
  { id: "developers", label: "Dictating code" },
  { id: "insertion", label: "How text lands" },
  { id: "updates", label: "Updates" },
  { id: "privacy", label: "Privacy" },
  { id: "troubleshooting", label: "Troubleshooting" },
] as const;

const BUILD = `git clone https://github.com/staraepp/clide_stt clide
cd clide
npm install
npm run app:build -- --debug --bundles app
open src-tauri/target/debug/bundle/macos/clide.app`;

export default function DocsPage() {
  return (
    <PageShell
      eyebrow="Documentation"
      title="Docs"
      width="wide"
      updated={`macOS ${RELEASE.version} · Windows ${RELEASE.windowsVersion}`}
    >
      <div className={styles.layout}>
        <DocsNav sections={SECTIONS} />

        <div className={`prose ${styles.body}`}>
          <section id="what-it-is">
            <h2>What clide is</h2>
            <p>
              clide is a dictation utility for macOS and Windows. You hold a shortcut, speak,
              and the text appears in whatever app you were already typing in.
              Rust owns the microphone, the shortcut, transcription, and insertion;
              React only draws the window.
            </p>
            <p>
              It is free and MIT licensed, and transcription runs on your device. There is
              no account, no cloud, and no API key to manage. Your audio is never
              uploaded.
            </p>
          </section>

          <section id="install">
            <h2>Install</h2>
            <h3>macOS</h3>
            <p>
              Open the <a href={RELEASE.dmg.url}>macOS {RELEASE.version} DMG</a> and drag clide into Applications.
              You need Apple Silicon and macOS {RELEASE.minMacOS} or later.
            </p>
            <CodeBlock code={`shasum -a 256 ~/Downloads/${RELEASE.dmg.file}`} />
            <h3>Windows</h3>
            <p>
              Run the <a href={RELEASE.windows.url}>Windows x64 {RELEASE.windowsVersion} installer</a> on a PC with
              WebView2. Choose Whisper or Parakeet in clide and download a model to get started.
              Windows supports Verbatim and Polished. Apple Speech, live typing, Rewrite, and the macOS Accessibility steps below are Mac-specific.
            </p>
            <p>
              The optional <a href={RELEASE.cuda.url}>CUDA installer</a> requires a compatible
              NVIDIA driver and GPU. The release notes describe its signing and testing status.
            </p>
            <CodeBlock code={`Get-FileHash "$HOME/Downloads/${RELEASE.windows.file}" -Algorithm SHA256`} />
            <p>Compare the result with the installer checksum in the <Link href="/#get-started">download section</Link>.</p>
            <div className="callout">
              <p>
                The current macOS installer is signed with a Developer ID certificate and
                notarized by Apple. The older{" "}
                {LEGACY.version} preview is not notarized, still contains the removed cloud engines,
                and has to be updated by hand.
              </p>
            </div>
            <h3>Build from source on macOS</h3>
            <CodeBlock code={BUILD} />
            <p>
              Use the bundled app rather than <code>npm run app</code>. Permissions are
              granted to a signed bundle, and the dev binary is not one.
            </p>
          </section>

          <section id="permissions">
            <h2>Permissions</h2>
            <p>
              clide asks for each permission at the moment it first needs it, never all
              at once on launch.
            </p>
            <table>
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
              Whisper and Parakeet run locally on either platform. Apple Speech is available on macOS. Switching between
              them never changes anything else about your setup.
            </p>
            <table>
              <thead>
                <tr><th>Engine</th><th>Needs</th></tr>
              </thead>
              <tbody>
                <tr><td>Apple Speech</td><td>Nothing, it ships with macOS and is forced on-device. The default on a fresh install, and the only engine that can type as you speak</td></tr>
                <tr><td>Local Whisper</td><td>A model you install</td></tr>
                <tr><td>Local Parakeet</td><td>A model you install</td></tr>
              </tbody>
            </table>
            <p>
              If an engine fails, clide tells you what happened and lets you retry or
              choose another one you have installed. It never changes engines behind
              your back.
            </p>
          </section>

          <section id="whisper-startup">
            <h2>Whisper startup on macOS</h2>
            <p>
              Whisper already used Metal for inference. Since Clide 2.1.3, the Apple Silicon
              app loads a precompiled <code>default.metallib</code> in place of compiling
              Metal shader source on the first model load.
            </p>
            <ul>
              <li>Metal library load fell from 11.3 s to about 0.001 s on an M2 Pro.</li>
              <li>App model load on the same Mac fell from about 9.45 s to about 0.98 s.</li>
              <li>Warm-up inference took about 0.91 s.</li>
              <li>A later 7.8 s dictation took about 0.44 s to transcribe.</li>
            </ul>
            <p>
              The first two measurements describe cold start. The inference timings were
              measured separately on the same Mac. See the{" "}
              <a href={`${RELEASES_URL}/tag/v2.1.3`}>Clide 2.1.3 release notes</a>.
            </p>
          </section>

          <section id="models">
            <h2>Local models</h2>
            <p>
              39 models, 33 Whisper builds and 6 Parakeet, from about 32 MB to 3.1 GB.
              You choose which to install: open Models, pick one, and press{" "}
              <strong>Install</strong>. Nothing is downloaded until you do, and you can
              remove a model whenever you like. There are no file paths to manage.
            </p>
            <p>
              The Models page ranks them for <em>your</em> Mac. It reads your chip and
              memory, and the stars come from that plus the model&apos;s own declared
              class. There is no popularity score, because clide has no telemetry and
              could not know one.
            </p>
            <h3>Which to start with</h3>
            <ul>
              <li><strong>Apple Speech</strong>: nothing to download. Try this first.</li>
              <li><strong>Whisper Large v3 Turbo, compressed</strong>: the best trade in the catalogue, Turbo&apos;s accuracy at roughly a third of the size.</li>
              <li><strong>Parakeet</strong>: very fast, and strong on conversational speech. Compressed builds bring it down to about 670 MB.</li>
            </ul>
            <p>
              Downloads stream to a partial file and only become installed after an
              atomic rename, so an interrupted download can never be mistaken for a
              working model.
            </p>
          </section>

          <section id="modes">
            <h2>Processing modes</h2>
            <table>
              <thead>
                <tr><th>Mode</th><th>What it does</th></tr>
              </thead>
              <tbody>
                <tr><td>Verbatim</td><td>Your words as spoken. Spacing is tidied, nothing else.</td></tr>
                <tr><td>Polished</td><td>Local cleanup of fillers, stutters, spacing and capitalisation. No model, no added delay.</td></tr>
                <tr><td>Rewrite</td><td>Turns spoken phrasing into written prose, on device, with Apple Intelligence or a local Ollama model.</td></tr>
              </tbody>
            </table>
            <div className="callout">
              <p>
                Rewrite runs the deterministic cleanup first and only then asks the
                model. If the rewrite engine is off, still downloading or fails, you get the
                polished transcript, never nothing. Refinement is never allowed to cost
                you words you already said.
              </p>
            </div>
            <p>
              Prefer Ollama? If it is running on your Mac, clide can use one of your installed
              models. clide only ever talks to Ollama on <code>127.0.0.1</code>, so the text stays
              on your machine. Choose the model in Settings, or leave it on automatic.
            </p>
          </section>

          <section id="shortcut">
            <h2>The shortcut</h2>
            <p>
              One shortcut, and you choose how it behaves: <strong>hold to talk</strong>,
              or <strong>press once to start and again to stop</strong>. The default is{" "}
              <code>⌥ .</code> and you can change it in Settings.
            </p>
            <p>
              While recording, a small pill appears near the bottom of the screen with a live
              level meter. It never takes keyboard focus, so your caret stays exactly where you
              left it. If something goes wrong it grows into a card with your transcript on a
              draggable chip, so you can drop the text straight into any field.
              clide can also lower other apps&apos; audio while you record, so it does not
              talk over your music.
            </p>
          </section>

          <section id="live">
            <h2>Live typing</h2>
            <p>
              With Apple Speech, words appear in the app as you say them instead of all at once
              when you stop. It is on by default and can be switched off in Settings. Whisper and
              Parakeet transcribe a finished recording, so they type when you stop. Live typing is
              off in Rewrite mode, which needs the whole sentence first.
            </p>
          </section>

          <section id="corrections">
            <h2>Spoken corrections</h2>
            <p>
              Change your mind mid-sentence. Say <em>&ldquo;scratch that&rdquo;</em> or{" "}
              <em>&ldquo;strike that&rdquo;</em> to delete back to the previous comma or sentence
              end, or <em>&ldquo;scratch the last sentence&rdquo;</em> to remove it. clide also
              collapses an immediate stutter such as &ldquo;I want it I want it to&rdquo;. If you
              scratch everything, nothing is inserted.
            </p>
            <p>
              Because live typing has already put the words on screen, corrections apply to batch
              dictation. A sentence that really contains &ldquo;scratch that&rdquo; will be treated
              as a command.
            </p>
          </section>

          <section id="developers">
            <h2>Dictating code</h2>
            <ul>
              <li><strong>Spoken punctuation</strong>: say &ldquo;comma&rdquo;, &ldquo;new line&rdquo; or &ldquo;question mark&rdquo; and clide types the punctuation. It works in every mode and adds no delay.</li>
              <li><strong>Developer dictation</strong>: primes Whisper with technical words so editors, terminals and browsers come out right. Choose Dev apps, Everywhere, or Off. Only local Whisper accepts a vocabulary prompt, so Apple Speech and Parakeet ignore it, and Settings says so.</li>
                            <li><strong>File paths as code</strong>: optional and off by default, because backticks are literal characters in a terminal. Turns &ldquo;open src slash app dot tsx&rdquo; into <code>`src/app.tsx`</code>.</li>
            </ul>
          </section>

          <section id="insertion">
            <h2>How text lands</h2>
            <p>
              Every transcript is copied to the clipboard first. That happens before any
              insertion is attempted, so if everything else fails your words are still
              one paste away.
            </p>
            <p>On Windows, clide sends Unicode keystrokes to the focused app. If insertion fails, paste from the clipboard or copy the transcript from History.</p>
            <p>On macOS, clide tries, in order:</p>
            <ul>
              <li><strong>Accessibility</strong>: writes straight into the focused control, and <em>verifies</em> the text actually changed rather than trusting the API&apos;s success code.</li>
              <li><strong>Typing</strong>: sends the text as Unicode keystrokes. This is what reaches Electron and Chromium apps.</li>
              <li><strong>Paste</strong>: a synthetic ⌘V, as a last resort.</li>
            </ul>
          </section>

          <section id="updates">
            <h2>Updates</h2>
            <p>
              On macOS, clide checks GitHub daily for a newer release. It never installs anything on
              its own: when one exists, the Update button appears, and only pressing it downloads
              the new version. The download is verified against a public key built into the app,
              so a package that was not signed by the project is rejected wherever it came from.
              In-app updating was introduced in macOS 2.0.0. For macOS {RELEASE.version}, download the DMG from this site. Windows remains on {RELEASE.windowsVersion}.
            </p>
          </section>

          <section id="privacy">
            <h2>Privacy</h2>
            <ul>
              <li>Recordings are temporary and deleted once the transcription resolves. History stores text, never audio.</li>
              <li>History is a local SQLite database on your device, searchable with full-text search.</li>
              <li>Your audio stays on your device, and there is no clide server and no account.</li>
              <li>The only network requests are the model downloads you start, the daily check for new releases, and an update you choose to install.</li>
            </ul>
            <p>
              The full picture is in the <a href="/privacy">Privacy Policy</a>.
            </p>
          </section>

          <section id="troubleshooting">
            <h2>Troubleshooting</h2>

            <h3>System Settings shows Accessibility on, but clide says it is not granted</h3>
            <p>
              Both are telling the truth. macOS ties the grant to the app&apos;s code
              signature, and a rebuilt preview build has a new one, so the switch you
              see belongs to a version that no longer exists. Use{" "}
              <strong>Repair access</strong> in Settings, which clears the stale record
              and asks macOS to register the running build.
            </p>

            <h3>Dictation works, but nothing appears in one particular app</h3>
            <p>
              Some apps, Electron and Chromium ones especially, report that they
              accepted the text and then discard it. clide checks whether the text
              actually changed and falls through to typing when it did not. If an app
              still refuses everything, the transcript is on your clipboard: paste it.
            </p>

            <h3>Rewrite says unavailable</h3>
            <p>
              Apple Intelligence needs to be switched on in System Settings, on Apple
              Silicon, running macOS 26 or later. The engine list in Settings shows
              which requirement is missing.
            </p>

            <h3>Something else</h3>
            <p>
              Open an issue at{" "}
              <a href={ISSUES_URL} target="_blank" rel="noreferrer">
                github.com/staraepp/clide_stt/issues
              </a>
              . Settings → About has a copyable build number, and including it makes
              the report far easier to act on.
            </p>
          </section>
        </div>
      </div>
    </PageShell>
  );
}
