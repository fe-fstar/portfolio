"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import HeadStart from "@/components/HeadStart";
import { useTranslations } from "next-intl";

const HorizontalScroll = () => {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end end"],
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 75,
        damping: 10,
        restDelta: 0.001,
    });

    const x = useTransform(smoothProgress, [0, 1], ["0%", "-66.666%"]);

    const m = useTranslations("HeadStart");

    return (
        <section ref={targetRef} className="relative h-[300vw]">
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">
                <motion.div style={{ x }} className="flex flex-nowrap w-[300vw] *:w-screen *:h-screen *:flex-shrink-0 *:flex *:pt-8 *:justify-center *:bg-bangladesh">
                    <div className="!flex-col items-center gap-y-8">
                        <p>
                            <em>{m("top")}</em>
                        </p>
                        <HeadStart className="w-3/5 h-auto" />
                        <p>
                            <em>{m("bottom")}</em>
                        </p>
                    </div>
                    <div>
                        <Projects />
                    </div>
                    <div>
                        <Experience />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

export default HorizontalScroll;