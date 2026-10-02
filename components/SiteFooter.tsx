import Link from "next/link";
import { ISSUES_URL, REPO_URL, WEBSITE_REPO_URL } from "@/lib/site";
import { Logo } from "./Logo";
import styles from "./SiteFooter.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brandCol}>
          <span className={styles.brand}>
            <Logo size={22} />
            clide
          </span>
          <p>Free, open-source dictation for macOS. Hold a shortcut, speak, and it types.</p>
          <p className={styles.legal}>MIT licensed · © 2026 staraepp</p>
        </div>

        <nav className={styles.col} aria-label="Product">
          <h2 className="eyebrow">Product</h2>
          <Link href="/#features">Features</Link>
          <Link href="/#models">Models</Link>
          <Link href="/changelog">Changelog</Link>
          <Link href="/docs">Docs</Link>
        </nav>

        <nav className={styles.col} aria-label="Open source">
          <h2 className="eyebrow">Open source</h2>
          <a href={REPO_URL} target="_blank" rel="noreferrer">App source</a>
          <a href={WEBSITE_REPO_URL} target="_blank" rel="noreferrer">Website source</a>
          <a href={ISSUES_URL} target="_blank" rel="noreferrer">Report an issue</a>
        </nav>

        <nav className={styles.col} aria-label="Legal">
          <h2 className="eyebrow">Legal</h2>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms of Use</Link>
          <Link href="/cookies">Cookies</Link>
          <Link href="/accessibility">Accessibility</Link>
        </nav>
      </div>

      <div className={styles.wordmark} aria-hidden="true">
        clide
      </div>
    </footer>
  );
}
