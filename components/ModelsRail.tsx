"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useScrollBlur } from "@/lib/scroll-effects";
import { MODELS } from "./app-window/demo-data";
import { Stars } from "./app-window/controls";
import { SectionHead } from "./SectionHead";
import styles from "./ModelsRail.module.css";

type Card = {
  id: string;
  name: string;
  blurb: string;
  meta: string;
  tag: string;
  ratings?: { accuracy: number; speed: number };
};

const CARDS: readonly Card[] = [
  {
    id: "apple-speech",
    name: "Apple Speech",
    blurb: "Built into macOS and forced on-device. Nothing to install, so it works the moment you open clide.",
    meta: "No install · Apple",
    tag: "Ready now",
  },
  ...MODELS.map((model) => ({
    id: model.id,
    name: model.name,
    blurb: model.blurb,
    meta: `${model.size} · ${model.runtime} · ${model.scope}`,
    tag: "Whisper",
    ratings: { accuracy: model.accuracy, speed: model.speed },
  })),
  {
    id: "parakeet-tdt-int8",
    name: "Parakeet TDT 0.6B (compressed)",
    blurb: "NVIDIA's transducer across 25 languages, quantised from about 2.5 GB down to about 670 MB.",
    meta: "~670 MB · ONNX · Multilingual",
    tag: "Parakeet",
  },
  {
    id: "parakeet-tdt-v2-int8",
    name: "Parakeet TDT 0.6B v2 (compressed)",
    blurb: "The English-focused generation, strong on dictation specifically, in a compact build.",
    meta: "~670 MB · ONNX · English only",
    tag: "Parakeet",
  },
];

export function ModelsRail() {
  const reduce = useReducedMotion();
  const outer = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const [shift, setShift] = useState(0);
  const blur = useScrollBlur(3.5, 340);

  useEffect(() => {
    const node = track.current;
    if (!node) return;
    let settled = false;
    const measure = () => {
      setShift(Math.max(0, node.scrollWidth - window.innerWidth));
      if (settled || !window.location.hash) return;
      settled = true;
      // The pinned height is only known now; re-apply the anchor the browser already jumped to.
      requestAnimationFrame(() =>
        document.getElementById(decodeURIComponent(window.location.hash.slice(1)))?.scrollIntoView(),
      );
    };
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: outer, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -shift]);
  const progress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const pinned = !reduce;

  return (
    <section className={styles.section} id="models" aria-labelledby="models-title">
      <div className="container">
        <SectionHead
          index="03"
          label="Local models"
          titleId="models-title"
          title={
            <>
              Thirty-nine models. <span className="serif">You choose.</span>
            </>
          }
        >
          <p>
            Browse the catalogue, read how each one will run on your Mac, and press
            Install on the ones you want. Nothing is downloaded until you do, and you
            can remove any model later.
          </p>
        </SectionHead>
      </div>

      <div
        ref={outer}
        className={pinned ? styles.outer : undefined}
        style={pinned ? { height: `calc(100svh + ${shift}px)` } : undefined}
      >
        <div className={pinned ? styles.sticky : undefined}>
          <div className={`container ${styles.bar}`}>
            <p className="eyebrow">A sample of the catalogue · you press Install on the ones you want</p>
            {pinned && (
              <span className={styles.progress} aria-hidden="true">
                <motion.i style={{ scaleX: progress }} />
              </span>
            )}
          </div>

          <motion.ul
            ref={track}
            className={`${styles.track} ${pinned ? "" : styles.native}`}
            style={pinned ? { x, filter: blur } : undefined}
          >
            {CARDS.map((card) => (
              <li key={card.id} className={styles.card}>
                <div className={styles.cardTop}>
                  <span className={styles.tag}>{card.tag}</span>
                </div>
                <h3>{card.name}</h3>
                <p>{card.blurb}</p>
                {card.ratings && (
                  <div className={styles.ratings}>
                    <span>
                      <Stars value={card.ratings.accuracy} /> Accuracy
                    </span>
                    <span>
                      <Stars value={card.ratings.speed} /> Speed
                    </span>
                  </div>
                )}
                <p className={styles.meta}>{card.meta}</p>
              </li>
            ))}
          </motion.ul>

          <p className={`container ${styles.note}`}>
            Ratings shown are for an Apple M2 Pro with 16 GB. clide reads your own chip
            and memory and rates every model for your Mac.
          </p>
        </div>
      </div>
    </section>
  );
}
