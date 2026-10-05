import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";
import { RELEASES_URL } from "@/lib/site";
import styles from "./changelog.module.css";

export const metadata: Metadata = {
  title: "Changelog — clide",
  description: "What changed in each release of clide, the open-source macOS dictation app.",
};

/**
 * Releases, newest first. Summaries describe what changed for someone using
 * clide, not what moved in the codebase.
 */
const RELEASES = [
  {
    version: "2.1.0",
    date: "5 October 2026",
    tag: "Latest",
    summary:
      "An optional Local API lets other apps on your Mac use clide for transcription and follow its recording state.",
    changes: [
      "Settings has a new Local API section, off by default. It listens on 127.0.0.1 only, so nothing on your network can reach it, and every request needs a token you can copy or regenerate.",
      "Transcribe audio files (wav, m4a, mp3, flac, caf, aiff) with your current engine and mode. The API never types anything.",
      "A live event stream reports when you start and stop recording, a mic level, partial text with Apple Speech, and each finished transcript.",
      "Choose the port, allow specific web origins, and switch the transcription and event endpoints on or off separately.",
    ],
  },
  {
    version: "2.0.0",
    date: "1 October 2026",
    tag: "Previous",
    summary:
      "clide goes fully local, gets a flat monochrome redesign, and learns to type as you speak and to take corrections.",
    changes: [
      "Removes the cloud engines, API keys and cloud rewrite. Everything now runs on your Mac, and Apple Speech is the default engine on a fresh install.",
      "Live typing: with Apple Speech, words appear in the app as you say them.",
      "Spoken corrections: say \"scratch that\" or \"strike that\" to delete back to the previous comma or sentence, and immediate stutters are collapsed.",
      "Developer dictation: technical vocabulary for Whisper in editors, terminals and browsers, with optional spoken file paths written as code.",
      "A local Rewrite engine for Ollama (loopback only) alongside Apple Intelligence.",
      "Six Parakeet models, including compressed builds, for 39 local models in total.",
      "A flat monochrome interface with a sidebar, and a small pill that appears near the bottom of the screen. If something fails it becomes a card with your transcript on a draggable chip.",
      "Rejects silence before transcribing and drops phantom transcripts such as a lone \"Thank you.\"",
      "Signed in-app updates that download and install only when you press Update, verified against a key built into the app.",
      "Developer ID signed and notarized builds, a new dark icon, and a DMG that stays dark when resized.",
    ],
  },
  {
    version: "0.1.2",
    date: "4 September 2026",
    tag: "Previous",
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
      "Grows the catalogue of local models across eight engines.",
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
      "Eight engines: Apple Speech, local Whisper, local Parakeet, and five cloud providers on your own key.",
      "A model manager that ranks local models against your actual chip and memory.",
      "Verbatim, Polished, and Rewrite via Apple Intelligence, all on device.",
      "Searchable local history in SQLite. Text only, and recordings are deleted once transcription resolves.",
      "A recording HUD that never steals keyboard focus.",
    ],
  },
] as const;

export default function ChangelogPage() {
  return (
    <PageShell
      eyebrow="Changelog"
      title="What's new"
      intro={
        <>
          Every release, newest first. Builds are on{" "}
          <a href={RELEASES_URL} target="_blank" rel="noreferrer" className={styles.link}>
            GitHub
          </a>
          .
        </>
      }
    >
      <ol className={styles.timeline}>
        {RELEASES.map((release, index) => (
          <Reveal as="li" key={release.version} delay={index * 0.05} className={styles.release}>
            <span className={styles.marker} aria-hidden="true" />
            <header className={styles.head}>
              <h2>{release.version}</h2>
              <time>{release.date}</time>
              {"tag" in release && <span className={styles.tag}>{release.tag}</span>}
            </header>
            <p className={styles.summary}>{release.summary}</p>
            <ul>
              {release.changes.map((change) => (
                <li key={change}>{change}</li>
              ))}
            </ul>
          </Reveal>
        ))}
      </ol>
    </PageShell>
  );
}
