import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { ISSUES_URL, REPO_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use — clide",
  description:
    "Terms for using the clide website and app: open-source MIT licensing, no warranty, and what happens with downloads and third-party services.",
};

export default function TermsPage() {
  return (
    <PageShell
      eyebrow="Legal"
      title="Terms of Use"
      updated="Last updated 1 October 2026"
      intro="clide is free, open-source software. These terms explain how you may use this website and the app, and what we promise and do not promise."
    >
      <div className="prose">
        <h2>Agreeing to these terms</h2>
        <p>
          By using this website, or by downloading and running clide, you agree
          to these terms and to our <Link href="/privacy">Privacy Policy</Link>.
          If you do not agree, please do not use them.
        </p>

        <h2>The software and its license</h2>
        <p>
          clide is open source under the MIT License. The source code is in the{" "}
          <a href={REPO_URL} target="_blank" rel="noreferrer">clide repository</a>{" "}
          and the website&apos;s source is in the{" "}
          <a href="https://github.com/staraepp/Clide-website" target="_blank" rel="noreferrer">
            website repository
          </a>
          . In plain language, you may use, copy, modify, merge, publish,
          distribute, sublicense and sell copies, provided the copyright and
          license notice are kept. The license text in each repository is
          what governs; this summary does not replace it.
        </p>

        <h2>No warranty</h2>
        <p>
          The software and this website are provided &quot;as is&quot;, without
          warranty of any kind, express or implied, including merchantability,
          fitness for a particular purpose and non-infringement. clide is
          early software (currently version 0.1). Expect rough edges.
          Transcription can be inaccurate, and text may be inserted in the
          wrong place or not at all. Check anything important before you
          rely on it, and do not use clide as your only record where an error
          could cause harm.
        </p>

        <h2>Limitation of liability</h2>
        <p>
          To the maximum extent permitted by law, the authors and contributors
          are not liable for any claim, damages, or other liability, whether in
          contract, tort or otherwise, arising from or in connection with the
          software, this website, or their use. Some places do not allow
          certain limits, so parts of this section may not apply to you.
        </p>

        <h2>Third-party services</h2>
        <p>
          clide runs on your Mac. When you press Install on a model, it is
          downloaded from Hugging Face, and the app checks GitHub for new
          releases. Those services are not operated by us, and their terms and
          privacy policies apply. Preview builds up to 0.1.2 also include
          optional cloud engines that use your own API key. If you use one,
          the provider&apos;s terms apply, and any charges are your
          responsibility. You are also responsible for having the right to
          record and transcribe the speech you process, including other
          people&apos;s voices.
        </p>

        <h2>Downloads</h2>
        <p>
          Builds are provided with a SHA-256 checksum so you can confirm the
          file you received. Releases from 2.0.0 on are signed and notarized by
          Apple. Version 0.1.2 is not, so macOS can show a warning on first
          launch. You can also build the app yourself from
          source.
        </p>

        <h2>Updates</h2>
        <p>
          From version 2.0.0, clide checks for new releases and can install one
          when you press Update. Updates are optional and are verified against
          the project&apos;s signature key before installing. An update may
          change how the software behaves, and these terms apply to the version
          you run.
        </p>

        <h2>Using this website</h2>
        <p>
          You may browse and share the site freely. Please do not attempt to
          disrupt it, probe it for vulnerabilities outside responsible
          disclosure, or use it to distribute malware. The name and logo of
          clide identify the project; please do not present a modified version
          as the official release.
        </p>

        <h2>Contributions</h2>
        <p>
          If you contribute code or content to either repository, you agree it
          may be distributed under that repository&apos;s license.
        </p>

        <h2>Changes and ending use</h2>
        <p>
          We may update these terms as the project changes. The date above
          shows the latest revision, and continuing to use the site or app
          after a change means you accept it. You can stop using clide at any
          time by deleting the app. We may remove or change the website or any
          download at any time.
        </p>

        <h2>If a part of these terms is unenforceable</h2>
        <p>
          If any provision is found to be unenforceable, the rest of these
          terms still apply.
        </p>

        <h2>Contact</h2>
        <p>
          Open an issue on the{" "}
          <a href={ISSUES_URL} target="_blank" rel="noreferrer">GitHub issue tracker</a>.
        </p>
      </div>
    </PageShell>
  );
}
