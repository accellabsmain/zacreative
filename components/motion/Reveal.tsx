"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Delay in seconds before the animation starts */
  delay?: number;
  /** Direction the element slides in from */
  direction?: Direction;
  /** Travel distance in px */
  distance?: number;
  duration?: number;
  /** Animate only the first time it enters the viewport */
  once?: boolean;
  as?: "div" | "section" | "article" | "li";
}

const offset = (direction: Direction, distance: number) => {
  switch (direction) {
    case "up":
      return { y: distance };
    case "down":
      return { y: -distance };
    case "left":
      return { x: distance };
    case "right":
      return { x: -distance };
    default:
      return {};
  }
};

/**
 * Fades + slides children into view when they enter the viewport.
 * Automatically disabled for users with `prefers-reduced-motion`.
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
  distance = 32,
  duration = 0.6,
  once = true,
  as = "div",
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const MotionTag = motion[as];

  const variants: Variants = {
    hidden: reduceMotion
      ? { opacity: 1 }
      : { opacity: 0, filter: "blur(6px)", ...offset(direction, distance) },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      filter: "blur(0px)",
      transition: { duration, delay, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.15, margin: "0px 0px -60px 0px" }}
      variants={variants}
    >
      {children}
    </MotionTag>
  );
}
