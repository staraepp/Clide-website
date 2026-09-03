import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — clide",
  description: "clide privacy policy: what this website collects (nothing) and how the open-source app handles your data.",
};

export default function PrivacyPage() {
  return (
    <main className="legal-page container">
      <Link href="/" className="legal-back">← Back to clide</Link>
      <h1 className="t-h1" style={{ marginTop: 24 }}>Privacy Policy</h1>
      <p className="legal-updated">Last updated September 2026</p>

      <p>
        clide is free, open-source software licensed under MIT. This page
        covers two things separately: this marketing website, and the clide
        app itself.
      </p>

      <h2>This website</h2>
      <p>
        This site is a static page with no accounts, no analytics, and no
        tracking scripts. We do not collect, store, or sell any personal
        data through it. There is nothing to sign up for and nothing to opt
        out of.
      </p>

      <h2>The clide app</h2>
      <p>
        clide runs on your Mac. Based on the project&apos;s current README:
      </p>
      <ul>
        <li>Audio is never stored — only text transcripts are saved.</li>
        <li>History lives in a local SQLite database on your machine, with full-text search over your own transcripts.</li>
        <li>Transcription currently runs through Groq using your own API key, which is stored in the macOS Keychain — not in a config file, not on our servers.</li>
        <li>Requests go straight from your machine to your chosen provider. clide has no backend that sees your audio or text.</li>
      </ul>
      <p>
        Because clide is open source, you can read the code yourself instead
        of taking our word for it — see the{" "}
        <a href="https://github.com/staraepp/clide_stt" target="_blank" rel="noreferrer">
          GitHub repository
        </a>.
      </p>

      <h2>We do not sell your data</h2>
      <p>
        clide does not sell, rent, or share user data, because clide does
        not collect user data in the first place. There is no analytics
        pipeline and no third party this project shares information with.
      </p>

      <h2>Questions</h2>
      <p>
        Open an issue on the{" "}
        <a href="https://github.com/staraepp/clide_stt/issues" target="_blank" rel="noreferrer">
          GitHub issue tracker
        </a>{" "}
        and a contributor will get back to you.
      </p>
    </main>
  );
}
