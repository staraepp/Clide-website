"use client";

import { AnimatePresence, motion } from "motion/react";
import { useId, useState } from "react";
import type { HistoryRow } from "./demo-data";
import styles from "./AppWindow.module.css";

export function HistoryView({ rows }: { rows: readonly HistoryRow[] }) {
  const [query, setQuery] = useState("");
  const inputId = useId();
  const needle = query.trim().toLowerCase();
  const visible = needle
    ? rows.filter((row) => `${row.text} ${row.app}`.toLowerCase().includes(needle))
    : rows;

  return (
    <div className={styles.view}>
      <header className={styles.sectionHead}>
        <label className={styles.label} htmlFor={inputId}>
          History
        </label>
        <span className={styles.label}>{visible.length} transcripts</span>
      </header>

      <input
        id={inputId}
        className={styles.search}
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search everything you have said"
        autoComplete="off"
        spellCheck={false}
      />

      <ul className={styles.rows}>
        <AnimatePresence initial={false} mode="popLayout">
          {visible.map((row) => (
            <motion.li
              key={row.id}
              layout="position"
              className={styles.row}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25 }}
            >
              <span className={styles.rowTime}>{row.time}</span>
              <span className={styles.rowApp}>{row.app}</span>
              <span className={styles.rowText}>{row.text}</span>
            </motion.li>
          ))}
        </AnimatePresence>
        {visible.length === 0 && <li className={styles.empty}>Nothing matches “{query}”.</li>}
      </ul>
      <p className={styles.footnote}>Text only. Recordings are deleted as soon as transcription finishes.</p>
    </div>
  );
}
