"use client";

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import { useEffect, useRef } from "react";

type CounterProps = {
  to: number;
  duration?: number;
  className?: string;
};

/** Counts up from zero the first time it scrolls into view. */
export function Counter({ to, duration = 1.8, className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const value = useMotionValue(0);
  const rounded = useTransform(value, (latest) => Math.round(latest));

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      value.set(to);
      return;
    }
    const controls = animate(value, to, { duration, ease: [0.22, 1, 0.36, 1] });
    return () => controls.stop();
  }, [inView, reduce, to, duration, value]);

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{to}</span>
      <motion.span aria-hidden="true">{rounded}</motion.span>
    </span>
  );
}
