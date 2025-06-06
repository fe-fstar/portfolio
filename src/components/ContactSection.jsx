
"use client";

import { Button } from "@/components/ui/button";
import { GitHub, LinkedIn } from "@/components/Icons";
import { Mail } from "lucide-react";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import ContactForm from "@/components/ContactForm";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";

const Spotify = dynamic(() => import("@/components/Spotify"), { ssr: false, loading: () => <div className="h-[450px] grid place-items-center">...</div> });

export default function ContactSection() {
    const contactRef = useRef(null);
    const inView = useInView(contactRef, { margin: "-10% 0px" });
    const m = useTranslations("Contact");

    const buttonVariants = {
        hidden: { y: 125, scale: 0, rotate: 45, opacity: 0 },
        visible: (i) => ({
            y: 0,
            scale: 1,
            rotate: 0,
            opacity: 1,
            transition: {
                delay: 0.666 + i * 0.222,
                duration: 0.666,
                ease: [0.34, 1.56, 0.64, 1],
            },
        }),
    };

    return (
        <section ref={contactRef} className="w-full min-h-page flex flex-col md:flex-row md:*:basis-1/2 justify-center items-center gap-4 px-8 py-8">
            <div className="space-y-8">
                <h4>
                    <strike>{m("strike")}</strike>
                    <em className="block">{m("title")}</em>
                </h4>
                <div className="flex flex-wrap items-center gap-8">
                    <p>{m("talkToMe")}</p>
                    <motion.div
                        custom={0}
                        initial="hidden"
                        animate={inView ? "visible" : "hidden"}
                        variants={buttonVariants}
                    >
                        <Button asChild className="bg-[#0072B1] text-foreground hover:bg-[#0061A0]">
                            <a href="https://www.linkedin.com/in/furkane/" target="_blank" title="Furkan Eryılmaz LinkedIn" rel="noopener noreferrer">
                                <LinkedIn className="fill-foreground" /> LinkedIn
                            </a>
                        </Button>
                    </motion.div>
                    <motion.div
                        custom={1}
                        initial="hidden"
                        animate={inView ? "visible" : "hidden"}
                        variants={buttonVariants}
                    >
                        <Button asChild className="bg-[#0D1117] text-foreground hover:bg-[#0C0006] border border-foreground" title="Furkan Eryılmaz GitHub" rel="noopener noreferrer">
                            <a href="https://github.com/fe-fstar" target="_blank">
                                <GitHub className="fill-foreground" /> GitHub
                            </a>
                        </Button>
                    </motion.div>
                    <motion.div
                        custom={2}
                        initial="hidden"
                        animate={inView ? "visible" : "hidden"}
                        variants={buttonVariants}
                    >
                        <Button asChild>
                            <a href="mailto:furkane.kolta@gmail.com" target="_blank" title="Furkan Eryılmaz Mail" rel="noopener noreferrer">
                                <Mail /> {m("email")}
                            </a>
                        </Button>
                    </motion.div>
                </div>
                <ContactForm />
            </div>
            <div className="w-full space-y-4">
                <Spotify />
                <p className="text-center text-balance">
                    <i>
                        <small>{m("music")}</small>
                    </i>
                </p>
            </div>
        </section>
    );
}
