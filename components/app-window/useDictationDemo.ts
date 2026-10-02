"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  PHRASES,
  SEED_ROWS,
  type DictationStyle,
  type HistoryRow,
  type Phase,
} from "./demo-data";

const LISTEN_MS = 2800;
const TRANSCRIBE_MS = 650;
const DONE_MS = 1900;
const IDLE_MS = 2200;
const TYPE_MS = 24;

function clock() {
  const now = new Date();
  return `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
}

/**
 * Drives the fake dictation in the hero window through the same states the
 * real app reports: listening, transcribing, inserting, done.
 */
export function useDictationDemo(style: DictationStyle, autoplay: boolean) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [typed, setTyped] = useState("");
  const [rows, setRows] = useState<readonly HistoryRow[]>(SEED_ROWS);
  const [index, setIndex] = useState(0);

  const styleRef = useRef(style);
  const nextId = useRef(100);

  useEffect(() => {
    styleRef.current = style;
  }, [style]);

  const start = useCallback(() => {
    setPhase((current) => (current === "idle" || current === "done" ? "listening" : current));
  }, []);

  useEffect(() => {
    const phrase = PHRASES[index % PHRASES.length];

    if (phase === "listening") {
      const timer = setTimeout(() => setPhase("transcribing"), LISTEN_MS);
      return () => clearTimeout(timer);
    }

    if (phase === "transcribing") {
      const timer = setTimeout(() => {
        setTyped("");
        setPhase("inserting");
      }, TRANSCRIBE_MS);
      return () => clearTimeout(timer);
    }

    if (phase === "inserting") {
      const text = phrase[styleRef.current];
      let count = 0;
      const timer = setInterval(() => {
        count += 1;
        setTyped(text.slice(0, count));
        if (count >= text.length) {
          clearInterval(timer);
          setRows((current) =>
            [{ id: nextId.current++, time: clock(), app: phrase.app, text }, ...current].slice(0, 5),
          );
          setPhase("done");
        }
      }, TYPE_MS);
      return () => clearInterval(timer);
    }

    if (phase === "done") {
      const timer = setTimeout(() => {
        setIndex((value) => value + 1);
        setPhase("idle");
      }, DONE_MS);
      return () => clearTimeout(timer);
    }

    if (phase === "idle" && autoplay) {
      const timer = setTimeout(start, IDLE_MS);
      return () => clearTimeout(timer);
    }
  }, [phase, index, autoplay, start]);

  return {
    phase,
    typed,
    rows,
    start,
    targetApp: PHRASES[index % PHRASES.length].app,
  };
}
