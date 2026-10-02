"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  type MotionValue,
} from "motion/react";
import styles from "./ScrollMeter.module.css";

const COUNT = 28;

function Tick({
  index,
  velocity,
  progress,
}: {
  index: number;
  velocity: MotionValue<number>;
  progress: MotionValue<number>;
}) {
  const position = index / (COUNT - 1);
  const wobble = 0.45 + 0.55 * Math.abs(Math.sin(index * 1.7));
  const scaleX = useTransform(velocity, (value) => 1 + Math.min(Math.abs(value) / 90, 3.2) * wobble);
  const opacity = useTransform(progress, (value) => {
    const distance = Math.abs(value - position) * COUNT;
    return 0.16 + 0.84 * Math.max(0, 1 - distance / 2.4);
  });
  return <motion.i className={styles.tick} style={{ scaleX, opacity }} />;
}

/** A level meter on the page edge. It listens to your scrolling the way clide listens to your voice. */
export function ScrollMeter() {
  const reduce = useReducedMotion();
  const { scrollY, scrollYProgress } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 40, stiffness: 320 });

  if (reduce) return null;

  return (
    <div className={styles.meter} aria-hidden="true">
      {Array.from({ length: COUNT }, (_, index) => (
        <Tick key={index} index={index} velocity={velocity} progress={scrollYProgress} />
      ))}
    </div>
  );
}
