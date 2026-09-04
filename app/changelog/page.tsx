import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Changelog — clide",
  description: "What changed in each release of clide, the open-source macOS dictation app.",
};

/**
 * Releases, newest first.
 *
 * Summaries describe what changed for someone *using* clide, not what moved in
 * the codebase — a changelog is read by people deciding whether to update.
 */
const RELEASES = [
  {
    version: "0.1.2",
    date: "4 September 2026",
    tag: "Latest",
    summary:
      "Repairs the Accessibility state where System Settings shows clide enabled but the grant belongs to an older build.",
    changes: [
      "Adds a Repair access action to the dashboard, onboarding, and Settings.",
      "Resets only clide's own stale Accessibility record, never any other app's.",
      "Asks macOS to register the running build immediately afterwards.",
      "Keeps status checks tied to the live Accessibility state rather than a stale switch.",
    ],
  },
  {
    version: "0.1.1",
    date: "4 September 2026",
    summary: "Makes dictation lossless and insertion considerably more reliable.",
    changes: [
      "Copies the exact final transcript to the clipboard before insertion is attempted, so a failure can never lose your words.",
      "Rejects rewrite output that summarises or truncates, keeping the full transcript instead.",
      "Verifies Accessibility targeting and paces the paste fallback.",
      "Grows the catalogue to 36 local models across eight engines.",
      "Checks for updates at most once a day and reports them in About.",
      "Adds a delayed Test insertion control for checking against a real editor.",
    ],
  },
  {
    version: "0.1.0",
    date: "3 September 2026",
    tag: "First release",
    summary:
      "The first version worth using every day: hold a shortcut, speak, and the text lands where you were typing.",
    changes: [
      "System-wide dictation with one shortcut, in hold-to-talk or press-to-toggle.",
      "Eight engines — Apple Speech, local Whisper, local Parakeet, and five cloud providers on your own key.",
      "A model manager that ranks local models against your actual chip and memory.",
      "Verbatim, Polished, and Rewrite via Apple Intelligence, all on device.",
      "Searchable local history in SQLite. Text only — recordings are deleted once transcription resolves.",
      "A recording HUD that never steals keyboard focus.",
    ],
  },
];

export default function ChangelogPage() {
  return (
    <main className="legal-page container">
      <Link href="/" className="legal-back">← Back to clide</Link>
      <h1 className="t-h1" style={{ marginTop: 24 }}>Changelog</h1>
      <p className="legal-updated">
        Every release, newest first. Builds are on{" "}
        <a href="https://github.com/staraepp/clide_stt/releases" target="_blank" rel="noreferrer">
          GitHub
        </a>.
      </p>

      {RELEASES.map((release) => (
        <article className="release" key={release.version}>
          <header className="release-head">
            <h2 className="release-version" style={{ margin: 0 }}>
              {release.version}
            </h2>
            <span className="release-date">{release.date}</span>
            {release.tag && <span className="release-tag">{release.tag}</span>}
          </header>
          <p className="release-summary">{release.summary}</p>
          <ul>
            {release.changes.map((change) => (
              <li key={change}>{change}</li>
            ))}
          </ul>
        </article>
      ))}
    </main>
  );
}
