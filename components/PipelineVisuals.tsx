"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState, type ReactNode } from "react";
import { SHORTCUT } from "@/lib/site";
import { CheckIcon } from "./Icons";
import { Waveform } from "./Waveform";
import { PHRASES } from "./app-window/demo-data";
import styles from "./PipelineVisuals.module.css";

const PHRASE = PHRASES[0];
const EASE = [0.22, 1, 0.36, 1] as const;

function Frame({ caption, children }: { caption: string; children: ReactNode }) {
  return (
    <div className={styles.frame}>
      <p className={`eyebrow ${styles.caption}`}>{caption}</p>
      <div className={styles.content}>{children}</div>
    </div>
  );
}

/** Counts up one item at a time while mounted, e.g. to reveal words or characters. */
function useProgress(total: number, interval: number, delay = 0) {
  const reduce = useReducedMotion();
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (reduce) return;
    let timer: ReturnType<typeof setInterval> | undefined;
    const start = setTimeout(() => {
      timer = setInterval(() => {
        setCount((value) => {
          if (value >= total) {
            if (timer) clearInterval(timer);
            return value;
          }
          return value + 1;
        });
      }, interval);
    }, delay);
    return () => {
      clearTimeout(start);
      if (timer) clearInterval(timer);
    };
  }, [total, interval, delay, reduce]);
  return reduce ? total : count;
}

export function ShortcutVisual() {
  const [pressed, setPressed] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setPressed(true), 650);
    return () => clearTimeout(timer);
  }, []);
  return (
    <Frame caption="01 · Shortcut">
      <div className={styles.keys}>
        {SHORTCUT.map((key, index) => (
          <motion.kbd
            key={key}
            className={`kbd ${styles.bigKey}`}
            data-pressed={pressed}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.12, ease: EASE }}
          >
            {key}
          </motion.kbd>
        ))}
      </div>
      <p className={styles.hint}>Hold to talk, or press once to start and again to stop.</p>
    </Frame>
  );
}

export function CaptureVisual() {
  return (
    <Frame caption="02 · Capture">
      <motion.div
        className={styles.hud}
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <span className={styles.hudLabel}>Listening</span>
        <Waveform active bars={32} />
      </motion.div>
      <p className={styles.hint}>A small HUD that never takes keyboard focus.</p>
    </Frame>
  );
}

export function TranscribeVisual() {
  const words = PHRASE.verbatim.split(" ");
  const shown = useProgress(words.length, 170, 500);
  return (
    <Frame caption="03 · Transcribe">
      <motion.div
        className={styles.engine}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <strong>Local Whisper</strong>
        <span>Whisper Large v3 Turbo Q5</span>
        <span className={styles.runs}>Runs on this Mac</span>
      </motion.div>
      <p className={styles.raw}>
        {words.slice(0, shown).join(" ")}
        <span className={styles.caret} aria-hidden="true" />
      </p>
    </Frame>
  );
}

export function ProcessVisual() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setDone(true), 900);
    return () => clearTimeout(timer);
  }, []);
  const words = PHRASE.verbatim.split(" ");
  return (
    <Frame caption="04 · Process">
      <p className={styles.raw}>
        {words.map((word, index) => (
          <span key={index} className={word === "um" && done ? styles.struck : undefined}>
            {word}{" "}
          </span>
        ))}
      </p>
      <AnimatePresence>
        {done && (
          <motion.p
            className={styles.polished}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            {PHRASE.polished}
          </motion.p>
        )}
      </AnimatePresence>
      <div className={styles.modes} aria-hidden="true">
        <span>Verbatim</span>
        <span data-active="true">Polished</span>
        <span>Rewrite</span>
      </div>
    </Frame>
  );
}

const FALLBACKS = ["Clipboard", "Accessibility", "Typing", "Paste"] as const;

export function InsertVisual() {
  const text = PHRASE.polished;
  const typed = useProgress(text.length, 28, 400);
  return (
    <Frame caption="05 · Insert">
      <div className={styles.editor}>
        <div className={styles.editorBar}>
          <i /> <i /> <i />
          <span>Notes</span>
        </div>
        <p>
          {text.slice(0, typed)}
          <span className={styles.caret} aria-hidden="true" />
        </p>
      </div>
      <ul className={styles.checks}>
        {FALLBACKS.map((item, index) => (
          <motion.li
            key={item}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + index * 0.18, duration: 0.5, ease: EASE }}
          >
            <CheckIcon size={13} /> {item}
          </motion.li>
        ))}
      </ul>
    </Frame>
  );
}

export function HistoryVisual() {
  const rows = [
    { time: "19:33", app: "Linear", text: "Move the model manager ticket into this sprint" },
    { time: "19:31", app: "Notes", text: "Call the dentist tomorrow morning" },
    { time: "19:28", app: "Slack", text: "Can you send me the latest build?" },
  ];
  return (
    <Frame caption="06 · History">
      <ul className={styles.rows}>
        <motion.li
          className={styles.newRow}
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <span>now</span>
          <span>Notes</span>
          <span>{PHRASE.polished}</span>
        </motion.li>
        {rows.map((row, index) => (
          <motion.li
            key={row.time}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
          >
            <span>{row.time}</span>
            <span>{row.app}</span>
            <span>{row.text}</span>
          </motion.li>
        ))}
      </ul>
      <p className={styles.hint}>Text only, in a local database. The recording is already gone.</p>
    </Frame>
  );
}
