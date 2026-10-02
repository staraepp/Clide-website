"use client";

import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ChipIcon } from "../Icons";
import { MODELS } from "./demo-data";
import { Stars } from "./controls";
import styles from "./AppWindow.module.css";

type Engine = "apple" | "whisper" | "parakeet";

const ENGINES = [
  { id: "apple", name: "Apple Speech", note: "Built into macOS" },
  { id: "whisper", name: "Local Whisper", note: "Downloaded models" },
  { id: "parakeet", name: "Parakeet", note: "Downloaded models" },
] as const satisfies readonly { id: Engine; name: string; note: string }[];

type ModelState = "installed" | "available" | "downloading";

export function ModelsView() {
  const [engine, setEngine] = useState<Engine>("whisper");
  const [inUse, setInUse] = useState("large-v3-turbo-q5");
  const [states, setStates] = useState<Record<string, ModelState>>({
    "large-v3-turbo-q5": "installed",
    "large-v3-turbo-q8": "installed",
    "small-q5": "available",
    "small-en-q5": "available",
  });
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(
    () => () => {
      for (const timer of timers.current) clearTimeout(timer);
    },
    [],
  );

  function download(id: string) {
    setStates((current) => ({ ...current, [id]: "downloading" }));
    timers.current.push(
      setTimeout(() => setStates((current) => ({ ...current, [id]: "installed" })), 1500),
    );
  }

  return (
    <div className={styles.view}>
      <div className={styles.hardware}>
        <span>
          <ChipIcon size={14} /> Apple M2 Pro
        </span>
        <span>16 GB memory</span>
        <span className={styles.muted}>6 performance cores · Metal acceleration</span>
      </div>

      <span className={styles.label}>Engines</span>
      <div className={styles.engines} role="radiogroup" aria-label="Engine">
        {ENGINES.map((item) => (
          <button
            key={item.id}
            type="button"
            role="radio"
            aria-checked={engine === item.id}
            className={styles.engineTile}
            data-selected={engine === item.id}
            onClick={() => setEngine(item.id)}
          >
            <span className={styles.engineTileName}>
              <ChipIcon size={13} /> {item.name}
              {engine === item.id && <motion.i layoutId="engine-dot" className={styles.okDot} />}
            </span>
            <span className={styles.sub}>{item.note}</span>
          </button>
        ))}
      </div>

      <div className={styles.blockHead} style={{ marginTop: 18 }}>
        <span className={styles.label}>Local Whisper models</span>
        <span className={styles.muted}>33 available · ranked for your Apple M2 Pro</span>
      </div>

      <ul className={styles.modelGrid}>
        {MODELS.map((model) => {
          const state = states[model.id];
          const active = inUse === model.id;
          return (
            <li key={model.id} className={styles.modelCard} data-active={active}>
              <div className={styles.modelTop}>
                <p className={styles.modelName}>{model.name}</p>
                <span className={styles.badge}>Runs great here</span>
              </div>
              <p className={styles.sub}>{model.blurb}</p>
              <div className={styles.ratings}>
                <Stars value={model.accuracy} /> <span className={styles.muted}>Accuracy</span>
                <Stars value={model.speed} /> <span className={styles.muted}>Speed here</span>
              </div>
              <div className={styles.modelFoot}>
                <span className={styles.meta}>
                  {model.size} · {model.runtime} · {model.scope}
                </span>
                {state === "installed" ? (
                  <button
                    type="button"
                    className={active ? styles.chipButtonDisabled : styles.chipButton}
                    disabled={active}
                    onClick={() => setInUse(model.id)}
                  >
                    {active ? "In use" : "Use"}
                  </button>
                ) : (
                  <button
                    type="button"
                    className={styles.chipButton}
                    disabled={state === "downloading"}
                    onClick={() => download(model.id)}
                  >
                    {state === "downloading" ? (
                      <span className={styles.progress} aria-label="Installing">
                        <motion.span
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 1.5, ease: "easeInOut" }}
                        />
                      </span>
                    ) : (
                      "Install"
                    )}
                  </button>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
