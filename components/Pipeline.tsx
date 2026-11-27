"use client";

import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { useRef, useState } from "react";
import { SectionHead } from "./SectionHead";
import {
  CaptureVisual,
  HistoryVisual,
  InsertVisual,
  ProcessVisual,
  ShortcutVisual,
  TranscribeVisual,
} from "./PipelineVisuals";
import styles from "./Pipeline.module.css";

const STEPS = [
  { name: "Shortcut", detail: "One key. Hold to talk or press to toggle.", Visual: ShortcutVisual },
  { name: "Capture", detail: "Rust owns the microphone. The HUD never steals focus.", Visual: CaptureVisual },
  { name: "Transcribe", detail: "Local Whisper and Parakeet, plus Apple Speech on Mac.", Visual: TranscribeVisual },
  { name: "Process", detail: "Verbatim, Polished, or an on-device Rewrite.", Visual: ProcessVisual },
  { name: "Insert", detail: "Straight into the app you were typing in.", Visual: InsertVisual },
  { name: "History", detail: "Saved as text in a local, searchable database.", Visual: HistoryVisual },
] as const;

const EASE = [0.22, 1, 0.36, 1] as const;

export function Pipeline() {
  const scene = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({ target: scene, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setActive(Math.min(STEPS.length - 1, Math.max(0, Math.floor(value * STEPS.length))));
  });

  const Visual = STEPS[active].Visual;

  return (
    <section className={styles.section} id="how" aria-labelledby="how-title">
      <div className="container">
        <SectionHead
          index="01"
          label="How it works"
          titleId="how-title"
          title={
            <>
              Six steps, <span className="serif">one</span> breath.
            </>
          }
        >
          <p>
            Every dictation takes the same short path. Scroll through it: this
            is exactly what happens between your voice and the text.
          </p>
        </SectionHead>
      </div>

      <div ref={scene} className={styles.scene} style={{ ["--steps" as string]: STEPS.length }}>
        <div className={styles.sticky}>
          <div className={`container ${styles.grid}`}>
            <ol className={styles.steps}>
              {STEPS.map((step, index) => (
                <li key={step.name} data-state={index < active ? "done" : index === active ? "active" : "todo"}>
                  <span className={styles.index}>{String(index + 1).padStart(2, "0")}</span>
                  <span className={styles.name}>{step.name}</span>
                  <span className={styles.detail}>{step.detail}</span>
                  <motion.span
                    className={styles.bar}
                    aria-hidden="true"
                    animate={{ scaleX: index <= active ? 1 : 0 }}
                    transition={{ duration: reduce ? 0 : 0.7, ease: EASE }}
                  />
                </li>
              ))}
            </ol>

            <div className={styles.stage} aria-hidden="true">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={active}
                  className={styles.visual}
                  initial={reduce ? false : { opacity: 0, y: 48, scale: 0.97, filter: "blur(16px)" }}
                  animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                  exit={reduce ? undefined : { opacity: 0, y: -48, scale: 0.97, filter: "blur(16px)" }}
                  transition={{ duration: 0.65, ease: EASE }}
                >
                  <Visual />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
