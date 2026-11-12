"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reducedMotion = useReducedMotion();
  return (
    <motion.div
      className={`reveal ${className}`}
      initial={false}
      whileInView={
        reducedMotion ? { opacity: 1, y: 0 } : { opacity: [0, 1], y: [20, 0] }
      }
      viewport={{ once: true, amount: 0.08 }}
      transition={{
        duration: reducedMotion ? 0 : 0.55,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
