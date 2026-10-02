"use client";

import { useReducedMotion, useScroll, useSpring, useTransform, useVelocity } from "motion/react";

/** A CSS `filter` that blurs in proportion to how fast the page is being scrolled. */
export function useScrollBlur(max = 6, divisor = 260) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 45, stiffness: 380 });
  return useTransform(smooth, (value) =>
    reduce ? "none" : `blur(${Math.min(max, Math.abs(value) / divisor).toFixed(2)}px)`,
  );
}

/** Signed, smoothed scroll velocity in px/s. */
export function useSmoothScrollVelocity() {
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  return useSpring(velocity, { damping: 50, stiffness: 400 });
}
