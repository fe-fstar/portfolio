"use client";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

export function LineShadowText({
  children,
  shadowColor = "black",
  className,
  as: Component = "span",
  ...props
}) {
  const MotionComponent = motion.create(Component);
  return (
    (<MotionComponent
      style={{
        "--shadow-color": shadowColor
      }}
      className={cn(
        "relative z-0 inline-flex",
        "after:absolute after:left-[0.08em] after:top-[0.08em] after:content-[attr(data-text)] after:whitespace-nowrap",
        "after:bg-[linear-gradient(45deg,transparent_35%,var(--shadow-color)_35%,var(--shadow-color)_65%,transparent_0)]",
        "after:-z-10 after:bg-[length:0.06em_0.06em] after:bg-clip-text after:text-transparent",
        "after:animate-line-shadow",
        className
      )}
      data-text={children}
      {...props}>
      {children}
    </MotionComponent>)
  );
}
