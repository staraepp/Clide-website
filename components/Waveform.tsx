"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import styles from "./Waveform.module.css";

type WaveformProps = {
  active: boolean;
  bars?: number;
  className?: string;
};

/** Microphone-level bars. Heights are written straight to the DOM each frame, no React re-render. */
export function Waveform({ active, bars = 40, className }: WaveformProps) {
  const refs = useRef<(HTMLSpanElement | null)[]>([]);
  const reduce = useReducedMotion();

  useEffect(() => {
    const nodes = refs.current;
    if (!active) {
      for (const node of nodes) if (node) node.style.transform = "scaleY(0.08)";
      return;
    }
    if (reduce) {
      nodes.forEach((node, index) => {
        if (node) node.style.transform = `scaleY(${0.25 + 0.5 * Math.abs(Math.sin(index * 0.6))})`;
      });
      return;
    }

    let raf = 0;
    let level = 0.3;
    const start = performance.now();
    const loop = (now: number) => {
      const t = (now - start) / 1000;
      // A slow "speech envelope" so the wave swells and drops like real phrases.
      const envelope = 0.45 + 0.55 * Math.abs(Math.sin(t * 1.3) * Math.cos(t * 0.45));
      level += (envelope - level) * 0.12;
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        if (!node) continue;
        const edge = Math.sin((i / (nodes.length - 1)) * Math.PI);
        const wobble = 0.5 + 0.5 * Math.sin(t * 7 + i * 0.7) * Math.sin(t * 3.1 + i * 0.23);
        const value = 0.08 + level * edge * (0.35 + 0.65 * wobble);
        node.style.transform = `scaleY(${Math.min(1, value)})`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [active, reduce]);

  return (
    <div className={`${styles.wave} ${className ?? ""}`} aria-hidden="true">
      {Array.from({ length: bars }, (_, index) => (
        <span
          key={index}
          ref={(node) => {
            refs.current[index] = node;
          }}
          className={styles.bar}
        />
      ))}
    </div>
  );
}
