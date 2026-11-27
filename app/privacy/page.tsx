import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { ISSUES_URL, REPO_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy — clide",
  description:
    "What the clide website and app do with your data: no accounts, no analytics, no cookies, and dictation that stays on your device.",
};

export default function PrivacyPage() {
  return (
    <PageShell
      eyebrow="Legal"
      title="Privacy Policy"
      updated="Last updated 5 October 2026"
      intro="The short version: clide processes dictation on your device. There are no accounts, no analytics, no tracking, and your audio is never uploaded."
    >
      <div className="prose">
        <h2>Who this covers</h2>
        <p>
          clide is free, open-source software maintained by the{" "}
          <a href="https://github.com/staraepp" target="_blank" rel="noreferrer">staraepp</a>{" "}
          project. This policy covers two separate things: this website
          (clide.staraep.fun), and the clide app for macOS and Windows. It
          does not cover the third-party services you may choose to connect.
        </p>

        <h2>This website</h2>
        <ul>
          <li>No accounts, no sign-up, no forms, and no newsletter.</li>
          <li>No analytics, advertising, or tracking scripts of any kind.</li>
          <li>
            No cookies and no browser storage. See the{" "}
            <Link href="/cookies">Cookie Policy</Link>.
          </li>
          <li>Fonts are bundled with the site, so your browser makes no requests to font providers.</li>
          <li>
            Our hosting provider delivers the website. GitHub delivers the current installers. Our web host processes technical request data
            (such as your IP address, browser type and the page requested) to
            deliver the site and keep it secure. We do not use that data to
            identify or profile visitors, and we have no access to your
            dictation.
          </li>
          <li>
            Links to GitHub and other sites take you to services with their own
            privacy policies.
          </li>
        </ul>

        <h2>The clide app</h2>
        <p>
          The app processes dictation on your device. There is no clide account and no clide
          server, and the app contains no analytics, telemetry or crash
          reporting. You can read the source in the{" "}
          <a href={REPO_URL} target="_blank" rel="noreferrer">GitHub repository</a>.
        </p>

        <h3>What is stored on your device</h3>
        <ul>
          <li>
            <strong>History:</strong> the text of your transcripts, with the
            time and the app you dictated into, in a local SQLite database.
            History never stores audio.
          </li>
          <li>
            <strong>Recordings:</strong> written to a temporary file and deleted
            as soon as transcription finishes, is cancelled, or expires. A short
            window (up to 120 seconds) is kept only so a failed transcription
            can be retried without speaking again.
          </li>
          <li>
            <strong>Models:</strong> the speech models you choose to install,
            kept on your disk until you remove them.
          </li>
          <li>
            <strong>Settings:</strong> your shortcut, chosen engine, processing
            mode and similar preferences.
          </li>
          <li>
            <strong>Local API token:</strong> only if you turn on the optional
            Local API, a random token is kept in the same local settings
            database. It is never written to logs.
          </li>
          <li>
            <strong>Old keys:</strong> installs that upgraded from a 0.1.x build
            may still have an unused API-key file on disk. It is no longer read,
            and you can delete it.
          </li>
        </ul>

        <h3>When the app connects to the internet</h3>
        <table>
          <thead>
            <tr>
              <th>When</th>
              <th>Who receives what</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>You dictate</td>
              <td>Nothing is sent anywhere. Apple Speech is forced on-device, and Whisper and Parakeet run locally.</td>
            </tr>
            <tr>
              <td>You press Install on a model</td>
              <td>Hugging Face receives a download request for that model, including your IP address. No model is downloaded unless you ask for it.</td>
            </tr>
            <tr>
              <td>Roughly once a day</td>
              <td>The app asks GitHub for the latest release information, so it can tell you when an update exists. GitHub receives the request like any web request, including your IP address.</td>
            </tr>
            <tr>
              <td>You press Update on macOS</td>
              <td>The new version is downloaded from GitHub, checked against a signature key built into the app, and only then installed. Nothing is ever installed without that button press.</td>
            </tr>
            <tr>
              <td>You turn on the Local API (off by default)</td>
              <td>Nothing is sent anywhere. clide listens on the loopback address (127.0.0.1) only, so just apps on the same device can reach it, and only with the token. It makes no outbound connections. Uploaded audio and transcripts are not logged, and uploaded audio is deleted when the request ends.</td>
            </tr>
            <tr>
              <td>You use Rewrite with Ollama on macOS</td>
              <td>Your transcript goes to Ollama running on your own Mac, over the loopback address (127.0.0.1) only. It does not travel over the internet.</td>
            </tr>
          </tbody>
        </table>

        <h3>Older preview builds</h3>
        <p>
          Preview builds up to and including 0.1.2 also contain optional cloud
          engines (Groq, OpenAI, Deepgram, ElevenLabs and AssemblyAI) that are
          off until you add your own API key. If you used one, your audio, or
          for cloud Rewrite your transcript text, went straight from your Mac to
          the provider you chose, under that provider&apos;s terms and privacy
          policy, and the key was kept in a user-only local file. Version
          2.0.0 and later are local-only and have no cloud engines or API keys.
          Those older builds also cannot update themselves.
        </p>

        <h3>Permissions</h3>
        <p>Clide needs microphone access on both platforms. macOS also uses separate Accessibility and Speech Recognition permissions.</p>
        <ul>
          <li><strong>Microphone:</strong> to record while you hold the shortcut.</li>
          <li><strong>Accessibility:</strong> to type the transcript into the app you were using.</li>
          <li><strong>Speech Recognition:</strong> only for Apple Speech.</li>
        </ul>
        <p>
          The app reads the name of the active application to label history
          entries. It does not read other apps&apos; content. With Apple Speech
          live typing on, it types words into the app as you speak them.
        </p>

        <h2>Your choices and rights</h2>
        <p>
          Because we do not collect or hold your personal data, there is
          nothing on our side to access, correct or delete. Everything the app
          keeps is on your device, and you control it: you can delete history
          entries, remove models, uninstall the app, and delete its data
          folder at any time. For data held by third parties such as our hosting provider,
          Hugging Face or GitHub, contact them directly under their policies. If
          you are in a region with data-protection laws such as the GDPR or
          the CCPA, you have the rights those laws give you. Ask us a question
          through the contact below and we will answer what we can.
        </p>

        <h2>Children</h2>
        <p>
          clide is a general-purpose utility and is not directed at children.
          We do not knowingly collect information from anyone, including
          children.
        </p>

        <h2>Changes to this policy</h2>
        <p>
          If the site or the app starts collecting anything it does not
          collect today, we will update this page first and note the change in
          the <Link href="/changelog">changelog</Link>. The date at the top
          shows when it was last revised.
        </p>

        <h2>Contact</h2>
        <p>
          Open an issue on the{" "}
          <a href={ISSUES_URL} target="_blank" rel="noreferrer">GitHub issue tracker</a>.
          Please do not post private or sensitive information in a public issue.
        </p>
      </div>
    </PageShell>
  );
}
