"use client";

import { motion } from "motion/react";
import { useId } from "react";
import styles from "./AppWindow.module.css";

type SegmentedProps<T extends string> = {
  label: string;
  value: T;
  options: readonly { value: T; label: string }[];
  onChange: (value: T) => void;
  compact?: boolean;
};

export function Segmented<T extends string>({
  label,
  value,
  options,
  onChange,
  compact = false,
}: SegmentedProps<T>) {
  const id = useId();
  return (
    <div
      role="radiogroup"
      aria-label={label}
      className={`${styles.segmented} ${compact ? styles.segmentedCompact : ""}`}
    >
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={selected}
            className={styles.segment}
            data-selected={selected}
            onClick={() => onChange(option.value)}
          >
            {selected && (
              <motion.span
                layoutId={`segment-${id}`}
                className={styles.segmentPill}
                transition={{ type: "spring", stiffness: 520, damping: 40 }}
              />
            )}
            <span className={styles.segmentLabel}>{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}

type ToggleProps = {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

export function Toggle({ label, checked, onChange }: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      className={styles.toggle}
      data-on={checked}
      onClick={() => onChange(!checked)}
    >
      <motion.span
        className={styles.toggleKnob}
        animate={{ x: checked ? 18 : 0 }}
        transition={{ type: "spring", stiffness: 600, damping: 34 }}
      />
    </button>
  );
}

export function Stars({ value }: { value: number }) {
  const id = useId();
  return (
    <span className={styles.stars} role="img" aria-label={`${value} out of 5`}>
      {Array.from({ length: 5 }, (_, index) => {
        const fill = Math.max(0, Math.min(1, value - index));
        const gradient = `${id}-${index}`;
        return (
          <svg key={index} width="11" height="11" viewBox="0 0 12 12" aria-hidden="true">
            <defs>
              <linearGradient id={gradient}>
                <stop offset={`${fill * 100}%`} stopColor="currentColor" />
                <stop offset={`${fill * 100}%`} stopColor="currentColor" stopOpacity="0.22" />
              </linearGradient>
            </defs>
            <path
              d="m6 .8 1.5 3.3 3.6.4-2.7 2.4.8 3.5L6 8.6l-3.2 1.8.8-3.5L.9 4.5l3.6-.4L6 .8Z"
              fill={`url(#${gradient})`}
            />
          </svg>
        );
      })}
      <span className={styles.starValue}>{value.toFixed(1)}</span>
    </span>
  );
}
