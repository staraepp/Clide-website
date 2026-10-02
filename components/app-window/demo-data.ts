export type DictationStyle = "verbatim" | "polished" | "rewrite";
export type Phase = "idle" | "listening" | "transcribing" | "inserting" | "done";

export type DemoPhrase = {
  app: string;
  verbatim: string;
  polished: string;
  rewrite: string;
};

/** One spoken sentence, shown the way each processing mode would write it. */
export const PHRASES: readonly DemoPhrase[] = [
  {
    app: "Notes",
    verbatim: "um so i think we should ship the new onboarding on thursday",
    polished: "So I think we should ship the new onboarding on Thursday.",
    rewrite: "Let's ship the new onboarding on Thursday.",
  },
  {
    app: "Slack",
    verbatim: "uh can you send me the the latest build when you get a chance",
    polished: "Can you send me the latest build when you get a chance?",
    rewrite: "Could you send me the latest build when you have a moment?",
  },
  {
    app: "Mail",
    verbatim: "thanks for the quick reply comma i will look at it tonight",
    polished: "Thanks for the quick reply, I will look at it tonight.",
    rewrite: "Thanks for the quick reply. I'll review it tonight.",
  },
] as const;

export type HistoryRow = { id: number; time: string; app: string; text: string };

export const SEED_ROWS: readonly HistoryRow[] = [
  { id: 1, time: "19:33", app: "Linear", text: "Move the model manager ticket into this sprint, it blocks onboarding." },
  { id: 2, time: "19:32", app: "clide", text: "OMG!" },
  { id: 3, time: "19:31", app: "Notes", text: "I was the girl in the village doing alright. Then I became a princess overnight." },
  { id: 4, time: "19:28", app: "clide", text: "Whoa, wait, this is actually pretty cool." },
] as const;

export type ModelCard = {
  id: string;
  name: string;
  blurb: string;
  accuracy: number;
  speed: number;
  size: string;
  runtime: string;
  scope: "Multilingual" | "English only";
};

export const MODELS: readonly ModelCard[] = [
  {
    id: "large-v3-turbo-q5",
    name: "Whisper Large v3 Turbo Q5",
    blurb: "The smallest Turbo build and a strong speed-to-quality tradeoff.",
    accuracy: 5,
    speed: 5,
    size: "547 MB",
    runtime: "whisper.cpp",
    scope: "Multilingual",
  },
  {
    id: "large-v3-turbo-q8",
    name: "Whisper Large v3 Turbo Q8",
    blurb: "Turbo with lighter quantisation for a quality-focused compact build.",
    accuracy: 5,
    speed: 3.5,
    size: "834 MB",
    runtime: "whisper.cpp",
    scope: "Multilingual",
  },
  {
    id: "small-q5",
    name: "Whisper Small Q5",
    blurb: "A compressed multilingual Small build. A good first download.",
    accuracy: 4,
    speed: 5,
    size: "181 MB",
    runtime: "whisper.cpp",
    scope: "Multilingual",
  },
  {
    id: "small-en-q5",
    name: "Whisper Small English Q5",
    blurb: "A compressed English-only Small build with strong accuracy.",
    accuracy: 4,
    speed: 5,
    size: "181 MB",
    runtime: "whisper.cpp",
    scope: "English only",
  },
] as const;
