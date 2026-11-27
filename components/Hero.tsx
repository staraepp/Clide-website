"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useCallback, useRef, useState } from "react";
import { RELEASE, REPO_URL } from "@/lib/site";
import { AppWindow } from "./app-window/AppWindow";
import type { Phase } from "./app-window/demo-data";
import { DownloadIcon, GithubIcon } from "./Icons";
import { ShaderField } from "./ShaderField";
import styles from "./Hero.module.css";

const ENERGY: Record<Phase, number> = {
  idle: 0,
  listening: 1,
  transcribing: 0.6,
  inserting: 0.4,
  done: 0.15,
};

const LINES = [
  [{ text: "Your" }, { text: "voice," }],
  [{ text: "typed" }, { text: "anywhere.", serif: true }],
] as const;

const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();
  const [energy, setEnergy] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const onPhaseChange = useCallback((phase: Phase) => setEnergy(ENERGY[phase]), []);

  // 0 when the window first peeks in, 1 when its top reaches the top of the screen.
  const { scrollYProgress } = useScroll({ target: stageRef, offset: ["start end", "start start"] });
  const copyOpacity = useTransform(scrollYProgress, [0.2, 0.85], [1, 0]);
  const copyScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const windowScale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);

  let wordIndex = 0;

  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <ShaderField energy={energy} fadeBottom={0.35} />

      <div className={styles.pin}>
        <motion.div
          className={`container ${styles.copy}`}
          style={reduce ? undefined : { opacity: copyOpacity, scale: copyScale, y: copyY }}
        >
          <motion.p
            className={`eyebrow ${styles.meta}`}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.1 }}
          >
            <span>clide / dictation for Mac and Windows</span>
            <span>
              v{RELEASE.version} · MIT · On-device
            </span>
          </motion.p>

          <h1 id="hero-title" className={`display ${styles.title}`}>
            {LINES.map((line, lineIndex) => (
              <span key={lineIndex} className={styles.line}>
                {line.map((word) => {
                  const delay = 0.15 + wordIndex++ * 0.11;
                  const isSerif = "serif" in word && word.serif;
                  return (
                    <motion.span
                      key={word.text}
                      className={`${styles.word} ${isSerif ? `serif ${styles.accent}` : ""}`}
                      initial={reduce ? false : { opacity: 0, y: "0.5em" }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1.1, delay, ease: EASE }}
                    >
                      {word.text}{" "}
                    </motion.span>
                  );
                })}
              </span>
            ))}
          </h1>

          <div className={styles.lower}>
            <motion.p
              className={`lede ${styles.sub}`}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7, ease: EASE }}
            >
              Hold a shortcut, speak, and clide types it into whatever app you
              were in. Transcription runs on your device, with no account or API key.
            </motion.p>

            <motion.div
              className={styles.ctas}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.82, ease: EASE }}
            >
              <a className={`btn btn-primary ${styles.fill}`} href={RELEASE.dmg.url}>
                <span aria-hidden="true">↘</span>
                Download for Mac
              </a>
              <a className={`btn btn-ghost ${styles.glass}`} href={RELEASE.windows.url}>
                <DownloadIcon />
                Download for Windows
              </a>
              <a className="btn btn-ghost" href={REPO_URL} target="_blank" rel="noreferrer">
                <GithubIcon />
                View source
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <motion.div
        ref={stageRef}
        className={`container ${styles.stage}`}
        initial={reduce ? false : { opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.3, delay: 0.6, ease: EASE }}
      >
        <motion.div style={reduce ? undefined : { scale: windowScale }} className={styles.windowWrap}>
          <AppWindow onPhaseChange={onPhaseChange} />
        </motion.div>
      </motion.div>
    </section>
  );
}
