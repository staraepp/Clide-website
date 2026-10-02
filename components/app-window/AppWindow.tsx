"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { SHORTCUT } from "@/lib/site";
import { ChipIcon, ClockIcon, HomeIcon, SlidersIcon } from "../Icons";
import { Logo } from "../Logo";
import type { DictationStyle, Phase } from "./demo-data";
import { HistoryView } from "./HistoryView";
import { HomeView } from "./HomeView";
import { ModelsView } from "./ModelsView";
import { SettingsView } from "./SettingsView";
import { useDictationDemo } from "./useDictationDemo";
import styles from "./AppWindow.module.css";

type Tab = "home" | "history" | "models" | "settings";

const TABS = [
  { id: "home", label: "Home", Icon: HomeIcon },
  { id: "history", label: "History", Icon: ClockIcon },
  { id: "models", label: "Models", Icon: ChipIcon },
  { id: "settings", label: "Settings", Icon: SlidersIcon },
] as const satisfies readonly { id: Tab; label: string; Icon: typeof HomeIcon }[];

type AppWindowProps = {
  onPhaseChange?: (phase: Phase) => void;
};

/** A working replica of the clide window that runs a looping dictation. */
export function AppWindow({ onPhaseChange }: AppWindowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const reduce = useReducedMotion();

  const [tab, setTab] = useState<Tab>("home");
  const [style, setStyle] = useState<DictationStyle>("polished");

  const { phase, typed, rows, start, targetApp } = useDictationDemo(style, inView && !reduce);

  useEffect(() => {
    onPhaseChange?.(phase);
  }, [phase, onPhaseChange]);

  const live = phase === "listening";

  return (
    <div ref={ref} className={styles.window} data-live={live}>
      <div className={styles.titlebar} aria-hidden="true">
        <i style={{ background: "#ff5f57" }} />
        <i style={{ background: "#febc2e" }} />
        <i style={{ background: "#28c840" }} />
      </div>

      <aside className={styles.sidebar}>
        <div className={styles.wordmark}>
          <Logo size={20} animated={live} />
          clide
        </div>

        <div role="tablist" aria-label="clide sections" aria-orientation="vertical" className={styles.nav}>
          {TABS.map(({ id, label, Icon }) => (
            <button
              key={id}
              id={`tab-${id}`}
              type="button"
              role="tab"
              aria-selected={tab === id}
              aria-controls="app-panel"
              className={styles.navItem}
              data-active={tab === id}
              onClick={() => setTab(id)}
            >
              {tab === id && (
                <motion.span
                  layoutId="nav-pill"
                  className={styles.navPill}
                  transition={{ type: "spring", stiffness: 480, damping: 38 }}
                />
              )}
              <span className={styles.navContent}>
                <Icon size={15} />
                {label}
              </span>
            </button>
          ))}
        </div>

        <div className={styles.sidebarFoot}>
          <span className={styles.footStatus}>
            <span className={styles.statusDot} data-phase={phase === "idle" ? "ready" : phase} />
            {phase === "idle" || phase === "done" ? "Ready" : phase === "listening" ? "Listening" : "Working"}
          </span>
          <span className={styles.keys} aria-hidden="true">
            {SHORTCUT.map((key) => (
              <kbd key={key} className="kbd" data-pressed={live}>
                {key}
              </kbd>
            ))}
          </span>
        </div>
      </aside>

      <div className={styles.main} id="app-panel" role="tabpanel" aria-labelledby={`tab-${tab}`}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={tab}
            className={styles.panel}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            {tab === "home" && (
              <HomeView
                phase={phase}
                typed={typed}
                rows={rows}
                targetApp={targetApp}
                style={style}
                onStyleChange={setStyle}
                onStart={start}
                onOpenModels={() => setTab("models")}
                onOpenHistory={() => setTab("history")}
              />
            )}
            {tab === "history" && <HistoryView rows={rows} />}
            {tab === "models" && <ModelsView />}
            {tab === "settings" && <SettingsView />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
