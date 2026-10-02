import type { Metadata } from "next";
import Link from "next/link";
import styles from "./not-found.module.css";

export const metadata: Metadata = {
  title: "Not found — clide",
  description: "That page does not exist.",
};

const BARS = Array.from({ length: 31 }, (_, index) => index);

/** A dictation that came back empty: the waveform is flat, with the odd twitch. */
export default function NotFound() {
  return (
    <main className={`container ${styles.main}`}>
      <div className={styles.wave} aria-hidden="true">
        {BARS.map((index) => (
          <span key={index} style={{ animationDelay: `${Math.abs(15 - index) * 0.09}s` }} />
        ))}
      </div>

      <p className="eyebrow">Error 404</p>
      <h1 className={`display ${styles.title}`}>
        Nothing here <span className="serif">to transcribe.</span>
      </h1>
      <p className="lede">
        That page does not exist. It may have moved, or the link may have been
        mistyped, which is the problem clide exists to solve.
      </p>

      <div className={styles.ctas}>
        <Link className="btn btn-primary" href="/">
          Back to clide
        </Link>
        <Link className="btn btn-ghost" href="/docs">
          Read the docs
        </Link>
      </div>
    </main>
  );
}
