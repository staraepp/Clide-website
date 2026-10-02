"use client";

import type { ReactNode } from "react";
import { Reveal } from "./Reveal";
import styles from "./BentoCard.module.css";

type BentoCardProps = {
  title: string;
  eyebrow?: string;
  description?: string;
  children?: ReactNode;
  className?: string;
  delay?: number;
};

/** A flat bento tile: hairline border, no gradients or glow. */
export function BentoCard({ title, eyebrow, description, children, className, delay }: BentoCardProps) {
  return (
    <Reveal as="article" className={`${styles.cell} ${className ?? ""}`} delay={delay}>
      <div className={styles.card}>
        <header className={styles.head}>
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          <h3>{title}</h3>
          {description && <p>{description}</p>}
        </header>
        {children && <div className={styles.body}>{children}</div>}
      </div>
    </Reveal>
  );
}
