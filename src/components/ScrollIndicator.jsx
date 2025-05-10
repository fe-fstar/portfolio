"use client";

import { useScroll, motion } from "motion/react";

export default function ScrollIndicator() {
    const { scrollYProgress } = useScroll();

    return <motion.div
        id="scroll-indicator"
        className="fixed bg-gradient-to-r from-rose-1 to-rose-2 origin-left top-0 left-0 right-0 h-3 z-10"
        style={{
            scaleX: scrollYProgress,
        }}
    />;
}