"use client";

import { motion, useInView, useSpring, useTransform } from "motion/react";
import { useEffect, useRef } from "react";

interface StatsCounterProps {
  value: number;
  label: string;
  suffix?: string;
  delay?: number;
}

export function StatsCounter({
  value,
  label,
  suffix = "",
  delay = 0,
}: StatsCounterProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const spring = useSpring(0, { mass: 0.8, stiffness: 75, damping: 15 });
  const display = useTransform(spring, (current) =>
    Math.round(current).toLocaleString()
  );

  useEffect(() => {
    if (isInView) {
      const timeout = setTimeout(() => {
        spring.set(value);
      }, delay * 1000);
      return () => clearTimeout(timeout);
    }
  }, [isInView, value, delay, spring]);

  return (
    <div ref={ref} className="text-center">
      <motion.div
        className="text-5xl sm:text-6xl font-bold text-[#B6FF3D] mb-2 bg-gradient-to-br from-[#B6FF3D] to-[#B6FF3D]/80 bg-clip-text text-transparent drop-shadow-lg font-mono"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, delay: delay * 0.2 }}
      >
        <motion.span>{display}</motion.span>
        {suffix}
      </motion.div>
      <motion.div
        className="text-gray-400 text-lg font-medium"
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: delay * 0.2 + 0.2 }}
      >
        {label}
      </motion.div>
    </div>
  );
}
