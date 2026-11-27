"use client";

import { AnimatePresence, motion } from "motion/react";
import { useId, useState } from "react";
import { BentoCard } from "./BentoCard";
import { Counter } from "./Counter";
import { SectionHead } from "./SectionHead";
import { Segmented, Toggle } from "./app-window/controls";
import { CheckIcon } from "./Icons";
import styles from "./Features.module.css";

/* ---------- Modes ---------- */

const MODES = [
  { value: "verbatim", label: "Verbatim" },
  { value: "polished", label: "Polished" },
  { value: "rewrite", label: "Rewrite" },
] as const;

type Mode = (typeof MODES)[number]["value"];

const MODE_TEXT: Record<Mode, { text: string; note: string }> = {
  verbatim: {
    text: "um so i think we should ship the new onboarding on thursday",
    note: "Exactly what you said. Only spacing is tidied.",
  },
  polished: {
    text: "So I think we should ship the new onboarding on Thursday.",
    note: "Casing, punctuation and fillers cleaned up locally. No model, no delay.",
  },
  rewrite: {
    text: "Let's ship the new onboarding on Thursday.",
    note: "Spoken phrasing becomes written prose. If it fails, you still get the polished text.",
  },
};

function ModesDemo() {
  const [mode, setMode] = useState<Mode>("polished");
  return (
    <div className={styles.modes}>
      <Segmented label="Processing mode" value={mode} options={MODES} onChange={setMode} />
      <div className={styles.sample}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={mode}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            {MODE_TEXT[mode].text}
          </motion.p>
        </AnimatePresence>
      </div>
      <p className={styles.caption} aria-live="polite">
        {MODE_TEXT[mode].note}
      </p>
    </div>
  );
}

/* ---------- Engines ---------- */

const ENGINES = [
  { name: "Apple Speech", note: "Built into macOS. Nothing to install, and it can type as you speak." },
  { name: "Local Whisper", note: "33 builds, from tiny to Large v3. You install the ones you want." },
  { name: "Parakeet", note: "NVIDIA's fast transducer, in full and compressed builds." },
] as const;

function EngineList() {
  return (
    <ul className={styles.engines}>
      {ENGINES.map((engine, index) => (
        <motion.li
          key={engine.name}
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ delay: index * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className={styles.engineName}>{engine.name}</span>
          <span className={styles.engineNote}>{engine.note}</span>
          <span className={styles.tag}>On-device</span>
        </motion.li>
      ))}
    </ul>
  );
}

/* ---------- Local models ---------- */

const MODEL_SIZES = [18, 28, 34, 46, 52, 64, 72, 86, 100] as const;

function ModelBars() {
  return (
    <div className={styles.bars} aria-hidden="true">
      {MODEL_SIZES.map((height, index) => (
        <motion.span
          key={index}
          initial={{ height: "6%" }}
          whileInView={{ height: `${height}%` }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 + index * 0.06, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        />
      ))}
    </div>
  );
}

/* ---------- Insertion ---------- */

const INSERT_STEPS = [
  { name: "Clipboard", detail: "Copied first, so words are never lost" },
  { name: "Accessibility", detail: "Written into the focused field and verified" },
  { name: "Typing", detail: "Unicode keystrokes for Electron and Chromium apps" },
  { name: "Paste", detail: "A synthetic ⌘V as the last resort" },
] as const;

function InsertCascade() {
  return (
    <ol className={styles.cascade}>
      {INSERT_STEPS.map((step, index) => (
        <motion.li
          key={step.name}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ delay: 0.1 + index * 0.14, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className={styles.check}>
            <CheckIcon size={12} />
          </span>
          <span>
            <strong>{step.name}</strong>
            <small>{step.detail}</small>
          </span>
        </motion.li>
      ))}
    </ol>
  );
}

/* ---------- Developer dictation ---------- */

function DeveloperDemo() {
  const [on, setOn] = useState(true);
  return (
    <div className={styles.dev}>
      <div className={styles.devRow}>
        <Toggle label="Write spoken file paths as code" checked={on} onChange={setOn} />
        <span>File paths as code {on ? "on" : "off"}</span>
      </div>
      <p className={styles.said}>
        <span className="eyebrow">You say</span>
        “open src slash app dot tsx”
      </p>
      <p className={styles.typed}>
        <span className="eyebrow">clide types</span>
        <AnimatePresence mode="wait" initial={false}>
          <motion.code
            key={String(on)}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
          >
            {on ? "`src/app.tsx`" : "open src slash app dot tsx"}
          </motion.code>
        </AnimatePresence>
      </p>
    </div>
  );
}

/* ---------- Spoken corrections ---------- */

const SPOKEN_CORRECTION = "Book the room for Monday. Scratch that. Book the room for Tuesday.";

function BacktrackDemo() {
  const [on, setOn] = useState(true);
  return (
    <div className={styles.dev}>
      <div className={styles.devRow}>
        <Toggle label="Apply spoken corrections" checked={on} onChange={setOn} />
        <span>Corrections {on ? "on" : "off"}</span>
      </div>
      <p className={styles.said}>
        <span className="eyebrow">You say</span>
        “{SPOKEN_CORRECTION}”
      </p>
      <p className={styles.typed}>
        <span className="eyebrow">clide types</span>
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={String(on)}
            className={styles.prose}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
          >
            {on ? "Book the room for Tuesday." : SPOKEN_CORRECTION}
          </motion.span>
        </AnimatePresence>
      </p>
    </div>
  );
}

/* ---------- Rewrite ---------- */

const REWRITERS = [
  { name: "Apple Intelligence", note: "Built into macOS 26 on Apple Silicon.", tag: "Built in" },
  { name: "Ollama", note: "Use your own installed model. clide only talks to 127.0.0.1.", tag: "Local" },
  { name: "Your words, always", note: "If a rewrite is off or fails, you get the polished transcript.", tag: "Fallback" },
] as const;

function RewriteList() {
  return (
    <ul className={styles.engines}>
      {REWRITERS.map((item) => (
        <li key={item.name}>
          <span className={styles.engineName}>{item.name}</span>
          <span className={styles.engineNote}>{item.note}</span>
          <span className={styles.tag}>{item.tag}</span>
        </li>
      ))}
    </ul>
  );
}

/* ---------- History ---------- */

const HISTORY = [
  { time: "19:33", app: "Linear", text: "Move the model manager ticket into this sprint" },
  { time: "19:31", app: "Notes", text: "Call the dentist tomorrow morning" },
  { time: "19:28", app: "Slack", text: "Can you send me the latest build when you get a chance?" },
  { time: "18:54", app: "Mail", text: "Thanks for the quick reply, I will look at it tonight." },
  { time: "18:40", app: "Notes", text: "Ideas for the onboarding screen: shorter, one permission per step" },
] as const;

function HistorySearch() {
  const [query, setQuery] = useState("");
  const id = useId();
  const needle = query.trim().toLowerCase();
  const rows = needle
    ? HISTORY.filter((row) => `${row.text} ${row.app}`.toLowerCase().includes(needle))
    : HISTORY;

  return (
    <div className={styles.history}>
      <label htmlFor={id} className="eyebrow">
        Try a search
      </label>
      <input
        id={id}
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="build, dentist, onboarding…"
        autoComplete="off"
        spellCheck={false}
      />
      <ul>
        <AnimatePresence initial={false} mode="popLayout">
          {rows.map((row) => (
            <motion.li
              key={row.time}
              layout="position"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
            >
              <span>{row.time}</span>
              <span>{row.app}</span>
              <span>{row.text}</span>
            </motion.li>
          ))}
        </AnimatePresence>
        {rows.length === 0 && <li className={styles.none}>No matches.</li>}
      </ul>
    </div>
  );
}

/* ---------- Section ---------- */

export function Features() {
  return (
    <section className={`container ${styles.section}`} id="features" aria-labelledby="features-title">
      <SectionHead
        index="02"
        label="Features"
        titleId="features-title"
        title={
          <>
            Small on screen. <span className="serif">Serious</span> underneath.
          </>
        }
      >
        <p>
          clide stays out of your way until you need it, and never changes your
          setup behind your back.
        </p>
      </SectionHead>

      <div className={styles.grid}>
        <BentoCard
          className={styles.modes7}
          eyebrow="Processing"
          title="Three ways to write it"
          description="Pick how the transcript reads. Try them on the same sentence."
        >
          <ModesDemo />
        </BentoCard>

        <BentoCard
          className={styles.engines5}
          eyebrow="Engines"
          title="Local speech recognition"
          description="Whisper and Parakeet run on Mac and Windows. Apple Speech is built into macOS."
          delay={0.08}
        >
          <EngineList />
        </BentoCard>

        <BentoCard
          className={styles.third}
          eyebrow="Local models"
          title="39 models, installed by you"
          description="33 Whisper builds and 6 Parakeet, from about 32 MB to 3.1 GB. Press Install on the ones you want. Nothing downloads until you do."
        >
          <div className={styles.stat}>
            <Counter to={39} className={styles.big} />
            <ModelBars />
          </div>
        </BentoCard>

        <BentoCard
          className={styles.third}
          eyebrow="Insertion"
          title="Types into the focused app"
          description="The Mac uses the steps below. Windows sends Unicode keystrokes. The transcript is available to paste if insertion fails."
          delay={0.08}
        >
          <InsertCascade />
        </BentoCard>

        <BentoCard
          className={styles.third}
          eyebrow="Privacy"
          title="Audio is never kept"
          description="Recordings are temporary and deleted once transcription resolves. History stores text only."
          delay={0.16}
        >
          <div className={styles.stat}>
            <span className={styles.big}>
              <Counter to={0} /> <small>bytes retained</small>
            </span>
            <div className={styles.dissolve} aria-hidden="true">
              {Array.from({ length: 26 }, (_, index) => (
                <span key={index} style={{ animationDelay: `${index * 0.07}s` }} />
              ))}
            </div>
          </div>
        </BentoCard>

        <BentoCard
          className={styles.half}
          eyebrow="Developers"
          title="Speak code, get code"
          description="Technical vocabulary for editors, terminals and browsers, spoken punctuation, and optional file paths written as code."
        >
          <DeveloperDemo />
        </BentoCard>

        <BentoCard
          className={styles.half}
          eyebrow="History"
          title="Everything you said, searchable"
          description="A local SQLite database with full-text search. Your transcripts stay on your device."
          delay={0.08}
        >
          <HistorySearch />
        </BentoCard>

        <BentoCard
          className={styles.half}
          eyebrow="Corrections"
          title="Say it, then unsay it"
          description="Change your mind mid-sentence. “Scratch that” deletes back to the previous sentence or comma, and stutters are collapsed."
        >
          <BacktrackDemo />
        </BentoCard>

        <BentoCard
          className={styles.half}
          eyebrow="Rewrite"
          title="Rewrites stay on your Mac"
          description="Turn rough speech into written prose with a model that runs on this machine."
          delay={0.08}
        >
          <RewriteList />
        </BentoCard>
      </div>
    </section>
  );
}
