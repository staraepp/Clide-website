import type { ReactNode } from "react";
import { Reveal } from "./Reveal";
import styles from "./PageShell.module.css";

type PageShellProps = {
  eyebrow: string;
  title: string;
  intro?: ReactNode;
  updated?: string;
  children: ReactNode;
  /** `wide` leaves room for a sidebar (docs). */
  width?: "narrow" | "wide";
};

export function PageShell({ eyebrow, title, intro, updated, children, width = "narrow" }: PageShellProps) {
  return (
    <main className={`container ${styles.main}`}>
      <Reveal className={styles.head} y={16}>
        <span className="eyebrow">{eyebrow}</span>
        <h1 className={`display ${styles.title}`}>{title}</h1>
        {intro && <p className="lede">{intro}</p>}
        {updated && <p className={styles.updated}>{updated}</p>}
      </Reveal>
      <div className={width === "narrow" ? styles.narrow : styles.wide}>{children}</div>
    </main>
  );
}
