"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { SHORTCUT } from "@/lib/site";
import { Segmented, Toggle } from "./controls";
import styles from "./AppWindow.module.css";

const TRIGGER_OPTIONS = [
  { value: "hold", label: "Hold to talk" },
  { value: "toggle", label: "Press to toggle" },
] as const;

const DEV_OPTIONS = [
  { value: "dev", label: "Dev apps" },
  { value: "everywhere", label: "Everywhere" },
  { value: "off", label: "Off" },
] as const;

function Row({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className={styles.settingRow}>
      <div>
        <p className={styles.settingTitle}>{title}</p>
        <p>{description}</p>
      </div>
      <div className={styles.settingControl}>{children}</div>
    </div>
  );
}

export function SettingsView() {
  const [trigger, setTrigger] = useState<(typeof TRIGGER_OPTIONS)[number]["value"]>("hold");
  const [liveTyping, setLiveTyping] = useState(true);
  const [punctuation, setPunctuation] = useState(true);
  const [devMode, setDevMode] = useState<(typeof DEV_OPTIONS)[number]["value"]>("everywhere");
  const [paths, setPaths] = useState(false);

  return (
    <div className={styles.view}>
      <Row
        title="Shortcut"
        description="One shortcut, used everywhere. Hold to talk, or press once to start and again to stop."
      >
        <div className={styles.inline}>
          <span className={styles.shortcutBox}>
            {SHORTCUT.map((key) => (
              <kbd key={key} className="kbd">
                {key}
              </kbd>
            ))}
          </span>
          <Segmented label="Trigger" value={trigger} options={TRIGGER_OPTIONS} onChange={setTrigger} compact />
        </div>
      </Row>

      <Row
        title="Transcription"
        description="Everything runs on this Mac. Your audio is never uploaded, and no account or key is needed."
      >
        <div className={styles.inline}>
          <div>
            <strong style={{ fontWeight: 500 }}>Local Whisper</strong>
            <p style={{ marginTop: 2 }}>Whisper Large v3 Turbo Q5</p>
          </div>
        </div>
      </Row>

      <Row
        title="Live typing"
        description="Words appear in the app you are speaking to as you say them, instead of all at once when you stop."
      >
        <div className={styles.inline}>
          <Toggle label="Live typing" checked={liveTyping} onChange={setLiveTyping} />
          <span>{liveTyping ? "On" : "Off"}</span>
        </div>
        <p className={styles.note}>Local Whisper can only transcribe a finished recording. Choose Apple Speech to type as you speak.</p>
      </Row>

      <Row
        title="Spoken punctuation"
        description="Say “comma”, “new line” or “question mark” and clide types the punctuation instead of the word."
      >
        <div className={styles.inline}>
          <Toggle label="Spoken punctuation" checked={punctuation} onChange={setPunctuation} />
          <span>{punctuation ? "On" : "Off"}</span>
        </div>
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={String(punctuation)}
            className={styles.note}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            {punctuation ? "“ready comma set” becomes “ready, set”." : "“ready comma set” is typed word for word."}
          </motion.p>
        </AnimatePresence>
      </Row>

      <Row
        title="Developer dictation"
        description="Helps clide hear technical words in editors, terminals and browsers, and can write spoken file paths as code."
      >
        <Segmented label="Developer dictation" value={devMode} options={DEV_OPTIONS} onChange={setDevMode} />
        <div className={styles.inline} style={{ marginTop: 12 }}>
          <Toggle label="Write spoken file paths as code" checked={paths} onChange={setPaths} />
          <span>Write spoken file paths as code</span>
        </div>
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={String(paths)}
            className={styles.note}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            {paths ? (
              <>
                “open src slash app dot tsx” becomes <code>`src/app.tsx`</code>.
              </>
            ) : (
              <>“open src slash app dot tsx” is typed as spoken.</>
            )}
          </motion.p>
        </AnimatePresence>
      </Row>
    </div>
  );
}
