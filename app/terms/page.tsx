import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service — clide",
  description: "clide terms of service: MIT license, no warranty, and what that means for you.",
};

export default function TermsPage() {
  return (
    <main className="legal-page container">
      <Link href="/" className="legal-back">← Back to clide</Link>
      <h1 className="t-h1" style={{ marginTop: 24 }}>Terms of Service</h1>
      <p className="legal-updated">Last updated September 2026</p>

      <p>
        clide is open-source software distributed under the{" "}
        <a href="https://github.com/staraepp/clide_stt/blob/main/LICENSE" target="_blank" rel="noreferrer">
          MIT License
        </a>. There is no account to create and no subscription to manage —
        you download or build the app and run it on your own machine.
      </p>

      <h2>MIT License, in plain language</h2>
      <p>
        You&apos;re free to use, copy, modify, merge, publish, distribute,
        sublicense, and even sell copies of clide, as long as the original
        copyright and license notice stay in the source. Full legal text
        lives in the repository&apos;s <code>LICENSE</code> file.
      </p>

      <h2>No warranty</h2>
      <p>
        clide is provided &quot;as is&quot;, without warranty of any kind. The
        contributors are not liable for any claim, damages, or other
        liability arising from use of the software. It&apos;s an actively
        developed project (currently v0.1) — expect rough edges.
      </p>

      <h2>Bring-your-own credentials</h2>
      <p>
        clide is a client for services you choose. If you connect a
        cloud provider, your use of that provider is governed by their own
        terms, not ours. Your API key is stored in a user-only local file
        and is sent only to the provider you configure. You can instead use
        Apple Speech or a downloaded local model where supported.
      </p>

      <h2>This website</h2>
      <p>
        This marketing site is provided for information about the clide
        project. It does not create any contract beyond the MIT license
        that governs the software itself.
      </p>

      <h2>Changes</h2>
      <p>
        Since clide is developed in the open, these terms may be updated as
        the project evolves. Check the{" "}
        <a href="https://github.com/staraepp/clide_stt" target="_blank" rel="noreferrer">
          GitHub repository
        </a>{" "}
        for the latest source of truth.
      </p>
    </main>
  );
}
