"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import styles from "./SectionHead.module.css";

type SectionHeadProps = {
  index: string;
  label: string;
  title: ReactNode;
  titleId: string;
  children?: ReactNode;
};

/** Numbered, left-aligned section opener. */
export function SectionHead({ index, label, title, titleId, children }: SectionHeadProps) {
  const reduce = useReducedMotion();

  return (
    <header className={styles.head}>
      <motion.p
        className={`eyebrow ${styles.label}`}
        initial={reduce ? false : { opacity: 0, x: -14 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className={styles.index}>{index}</span>
        {label}
      </motion.p>
      <div className={styles.copy}>
        <motion.h2
          id={titleId}
          className={`display ${styles.title}`}
          initial={reduce ? false : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          {title}
        </motion.h2>
        {children && (
          <motion.div
            className={`lede ${styles.lede}`}
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 0.9, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            {children}
          </motion.div>
        )}
      </div>
    </header>
  );
}
