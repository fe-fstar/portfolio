"use client";

import { cn } from "@/lib/utils";
import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

export const AnimatedSpan = ({
  children,
  delay = 0,
  className,
  triggerOnce = true,
  rootMargin = "0px 0px -10% 0px", // Starts animation when 10% of the element is visible
  ...props
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: triggerOnce, margin: rootMargin });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: -5 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.3, delay: delay / 1000 }}
      className={cn("grid text-sm font-normal tracking-tight", className)}
      {...props}>
      {children}
    </motion.div>
  );
};

export const TypingAnimation = ({
  children,
  className,
  duration = 60,
  delay = 0,
  triggerOnce = true,
  rootMargin = "0px 0px -10% 0px",
  as: Component = "span",
  ...props
}) => {
  if (typeof children !== "string") {
    throw new Error("TypingAnimation: children must be a string.");
  }

  const ref = useRef(null);
  const isInView = useInView(ref, { once: triggerOnce, margin: rootMargin });
  const MotionComponent = motion.create(Component, { forwardMotionProps: true });

  const [displayedText, setDisplayedText] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!isInView) return;

    const startTimeout = setTimeout(() => {
      setStarted(true);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [isInView, delay]);

  useEffect(() => {
    if (!started) return;

    let i = 0;
    const typingEffect = setInterval(() => {
      if (i < children.length) {
        setDisplayedText(children.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingEffect);
      }
    }, duration);

    return () => clearInterval(typingEffect);
  }, [children, duration, started]);

  return (
    <MotionComponent ref={ref} className={cn("text-sm font-normal tracking-tight", className)} {...props}>
      {displayedText}
    </MotionComponent>
  );
};


export const Terminal = ({
  children,
  className
}) => {
  return (
    (<div
      className={cn(
        "z-0 h-full w-full max-w-lg rounded-xl border border-border bg-background",
        className
      )}>
      <div className="flex flex-col gap-y-2 border-b border-border p-4">
        <div className="flex flex-row gap-x-2">
          <div className="h-2 w-2 rounded-full bg-red-500"></div>
          <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
          <div className="h-2 w-2 rounded-full bg-green-500"></div>
        </div>
      </div>
      <pre className="p-4">
        <code className="grid gap-y-1 break-words text-wrap">{children}</code>
      </pre>
    </div>)
  );
};
