"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useSpring } from "motion/react"
import Projects from "@/components/Projects"
import Experience from "@/components/Experience"
import HeadStart from "@/components/HeadStart"
import { useTranslations } from "next-intl"
import { useMediaQuery } from "@/hooks/use-media-query"

const HorizontalScroll = () => {
    const targetRef = useRef(null)
    const isMobile = useMediaQuery("(max-width: 1023px)")

    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end end"],
    })

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 75,
        damping: 10,
        restDelta: 0.001,
    })

    // Only apply horizontal transform on desktop
    const x = useTransform(smoothProgress, [0, 1], isMobile ? ["0%", "0%"] : ["0%", "-67%"])

    const m = useTranslations("HeadStart")

    return (
        <section ref={targetRef} className={isMobile ? "relative" : "relative h-[300vh]"}>
            <div className={isMobile ? "relative" : "sticky top-0 flex h-screen items-center overflow-hidden"}>
                <motion.div
                    style={{ x: isMobile ? 0 : x }}
                    className={
                        isMobile
                            ? "flex flex-col"
                            : "flex flex-nowrap w-[300vw] *:w-screen *:h-screen *:flex-shrink-0 *:flex *:items-center *:justify-center *:bg-bangladesh"
                    }
                >
                    {/* HeadStart Section */}
                    <div
                        className={
                            isMobile
                                ? "flex flex-col items-center justify-between bg-bangladesh px-4 py-16"
                                : "!flex-col gap-y-8"
                        }
                    >
                        <p>
                            <em>{m("top")}</em>
                        </p>
                        <div className={isMobile ? "my-16" : "contents"}>
                            <HeadStart className={isMobile ? "w-3/5 max-w-md h-auto rotate-90 mx-auto" : "w-3/5 h-auto"} />
                        </div>
                        <p>
                            <em>{m("bottom")}</em>
                        </p>
                    </div>

                    {/* Projects Section */}
                    <div className={isMobile ? "flex items-center justify-center bg-bangladesh px-4 py-16" : ""}>
                        <Projects />
                    </div>

                    {/* Experience Section */}
                    <div className={isMobile ? "flex items-center justify-center bg-bangladesh px-4 py-16" : ""}>
                        <Experience />
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default HorizontalScroll
