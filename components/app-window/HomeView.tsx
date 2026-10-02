"use client";

import { AnimatePresence, motion } from "motion/react";
import { SHORTCUT } from "@/lib/site";
import { ArrowUpRightIcon, MicIcon } from "../Icons";
import { Waveform } from "../Waveform";
import type { DictationStyle, HistoryRow, Phase } from "./demo-data";
import { Segmented } from "./controls";
import styles from "./AppWindow.module.css";

const STYLE_OPTIONS = [
  { value: "verbatim", label: "Verbatim" },
  { value: "polished", label: "Polished" },
  { value: "rewrite", label: "Rewrite" },
] as const;

const STYLE_COPY: Record<DictationStyle, string> = {
  verbatim: "Your words exactly as spoken. Only spacing is tidied.",
  polished: "Formats your text: punctuation, capitals, and “um” removed. Local, instant.",
  rewrite: "Turns spoken phrasing into written prose on device, with Apple Intelligence or Ollama.",
};

const PHASE_LABEL: Record<Phase, string> = {
  idle: "Ready",
  listening: "Listening",
  transcribing: "Transcribing",
  inserting: "Inserting",
  done: "Done",
};

type HomeViewProps = {
  phase: Phase;
  typed: string;
  rows: readonly HistoryRow[];
  targetApp: string;
  style: DictationStyle;
  onStyleChange: (style: DictationStyle) => void;
  onStart: () => void;
  onOpenModels: () => void;
  onOpenHistory: () => void;
};

export function HomeView({
  phase,
  typed,
  rows,
  targetApp,
  style,
  onStyleChange,
  onStart,
  onOpenModels,
  onOpenHistory,
}: HomeViewProps) {
  const busy = phase !== "idle" && phase !== "done";
  const showText = phase === "inserting" || phase === "done";

  return (
    <div className={styles.view}>
      <header className={styles.sectionHead}>
        <span className={styles.label}>Dictation</span>
        <span className={styles.keys} aria-label="Shortcut Option period">
          {SHORTCUT.map((key) => (
            <kbd key={key} className="kbd" data-pressed={phase === "listening"}>
              {key}
            </kbd>
          ))}
        </span>
      </header>

      <div className={styles.dictation} data-phase={phase}>
        <div className={styles.status}>
          <span className={styles.statusDot} data-phase={phase} />
          <span className={styles.label} aria-live="polite">
            {PHASE_LABEL[phase]}
            {showText && ` · ${targetApp}`}
          </span>
        </div>

        <div className={styles.dictationBody}>
          <AnimatePresence mode="wait" initial={false}>
            {phase === "listening" ? (
              <motion.div
                key="wave"
                className={styles.waveWrap}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
              >
                <Waveform active bars={44} />
              </motion.div>
            ) : phase === "transcribing" ? (
              <motion.p
                key="think"
                className={styles.dictationText}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <span className={styles.dots} aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </span>
              </motion.p>
            ) : showText ? (
              <motion.p
                key="text"
                className={`${styles.dictationText} ${styles.dictationTyped}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {typed}
                {phase === "inserting" && <span className={styles.caret} aria-hidden="true" />}
              </motion.p>
            ) : (
              <motion.p
                key="idle"
                className={`${styles.dictationText} ${styles.muted}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                Hold ⌥ . anywhere and speak.
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className={styles.startRow}>
        <button type="button" className={styles.startButton} onClick={onStart} disabled={busy}>
          <MicIcon size={15} />
          Start dictation
        </button>
        <span className={styles.hint}>
          Hold
          {SHORTCUT.map((key) => (
            <kbd key={key} className="kbd">
              {key}
            </kbd>
          ))}
          anywhere in macOS
        </span>
      </div>

      <div className={styles.twoCol}>
        <section className={styles.block} aria-label="Engine">
          <div className={styles.blockHead}>
            <span className={styles.label}>Engine</span>
            <button type="button" className={styles.linkButton} onClick={onOpenModels}>
              Change engine <ArrowUpRightIcon size={12} />
            </button>
          </div>
          <p className={styles.engineName}>Local Whisper</p>
          <p className={styles.sub}>Whisper Large v3 Turbo Q5</p>
          <p className={styles.runs}>
            <span className={styles.okDot} /> Runs on this Mac
          </p>
        </section>

        <section className={styles.block} aria-label="Style">
          <div className={styles.blockHead}>
            <span className={styles.label}>Style</span>
          </div>
          <Segmented label="Processing mode" value={style} options={STYLE_OPTIONS} onChange={onStyleChange} />
          <p className={styles.styleCopy}>{STYLE_COPY[style]}</p>
        </section>
      </div>

      <section className={styles.recent} aria-label="Recent transcripts">
        <div className={styles.blockHead}>
          <span className={styles.label}>Recent</span>
          <button type="button" className={styles.linkButton} onClick={onOpenHistory}>
            All transcripts <ArrowUpRightIcon size={12} />
          </button>
        </div>
        <ul className={styles.rows}>
          <AnimatePresence initial={false}>
            {rows.slice(0, 4).map((row) => (
              <motion.li
                key={row.id}
                layout="position"
                className={styles.row}
                initial={{ opacity: 0, y: -14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              >
                <span className={styles.rowTime}>{row.time}</span>
                <span className={styles.rowApp}>{row.app}</span>
                <span className={styles.rowText}>{row.text}</span>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </section>
    </div>
  );
}
