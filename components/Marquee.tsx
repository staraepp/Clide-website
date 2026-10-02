"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useTransform,
  wrap,
} from "motion/react";
import { useRef } from "react";
import { useSmoothScrollVelocity } from "@/lib/scroll-effects";
import styles from "./Marquee.module.css";

const APPS = [
  "Slack",
  "Notion",
  "VS Code",
  "Gmail",
  "Linear",
  "Figma",
  "Messages",
  "Notes",
  "Obsidian",
  "Terminal",
  "Zoom",
  "Safari",
] as const;

const BASE_SPEED = -2.2; // percent of one group per second

/** Drifts on its own, then surges in the direction you scroll. */
export function Marquee() {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const velocity = useSmoothScrollVelocity();
  const direction = useRef(1);
  const transform = useTransform(x, (value) => `translate3d(${wrap(-50, 0, value)}%, 0, 0)`);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    const scrollVelocity = velocity.get();
    if (scrollVelocity < -1) direction.current = -1;
    else if (scrollVelocity > 1) direction.current = 1;
    const boost = Math.min(Math.abs(scrollVelocity) / 160, 14);
    x.set(x.get() + BASE_SPEED * direction.current * (1 + boost) * (delta / 1000));
  });

  return (
    <div className={styles.marquee}>
      <p className={`eyebrow ${styles.label}`}>Types into the apps you already use</p>
      <div className={styles.viewport} aria-hidden="true">
        <motion.div className={styles.track} style={{ transform }}>
          {[0, 1].map((copy) => (
            <ul key={copy} className={styles.group}>
              {APPS.map((app) => (
                <li key={app}>{app}</li>
              ))}
            </ul>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
