import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { ISSUES_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cookie Policy — clide",
  description: "The clide website sets no cookies and uses no browser storage, so there is no cookie banner.",
};

export default function CookiesPage() {
  return (
    <PageShell
      eyebrow="Legal"
      title="Cookie Policy"
      updated="Last updated 1 October 2026"
      intro="This website does not set cookies and does not store anything in your browser, which is why there is no cookie banner."
    >
      <div className="prose">
        <h2>What we use</h2>
        <p>
          At the date above, this website does not use cookies, local storage,
          session storage, IndexedDB, fingerprinting, or similar technologies,
          whether first-party or third-party. It runs no analytics or
          advertising, and it loads no scripts, fonts or media from other
          companies&apos; servers.
        </p>
        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Used?</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Strictly necessary cookies</td><td>No</td></tr>
            <tr><td>Preference cookies</td><td>No. The site does not remember settings between visits.</td></tr>
            <tr><td>Analytics or statistics</td><td>No</td></tr>
            <tr><td>Advertising or tracking</td><td>No</td></tr>
          </tbody>
        </table>

        <h2>Things that are not cookies</h2>
        <ul>
          <li>
            Your browser may cache pages and files to load the site faster.
            That is handled by the browser, and you can clear it in your
            browser settings.
          </li>
          <li>
            Our hosting provider processes standard request data, such as your
            IP address, when it delivers pages. This is described in the{" "}
            <Link href="/privacy">Privacy Policy</Link>.
          </li>
          <li>
            If you follow a link to GitHub or another site, that site may set
            its own cookies under its own policy.
          </li>
          <li>
            The clide app is a separate program on your Mac. It does not use
            browser cookies for tracking, and it contains no analytics.
          </li>
        </ul>

        <h2>If this changes</h2>
        <p>
          If we ever add anything that needs cookies or similar storage, we
          will update this page first and, where the law requires it, ask for
          your consent before setting anything other than strictly necessary
          cookies.
        </p>

        <h2>Contact</h2>
        <p>
          Questions? Open an issue on the{" "}
          <a href={ISSUES_URL} target="_blank" rel="noreferrer">GitHub issue tracker</a>.
        </p>
      </div>
    </PageShell>
  );
}
