"use client";

import { Button } from "@/components/ui/button";
import { GitHub, LinkedIn } from "@/components/Icons";
import { Mail } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { Suspense, useRef } from "react";
import ContactForm from "@/components/ContactForm";
import { useTranslations } from "next-intl";

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
        <section ref={contactRef} className="w-full min-h-screen flex flex-col md:flex-row md:*:basis-1/2 justify-center items-center gap-4 px-8 py-8">
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
                            <a href="https://www.linkedin.com/in/furkane/" target="_blank" rel="nofollow">
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
                        <Button asChild className="bg-[#0D1117] text-foreground hover:bg-[#0C0006] border border-foreground">
                            <a href="https://github.com/fe-fstar" target="_blank" rel="nofollow">
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
                            <a href="mailto:furkane.kolta@gmail.com" target="_blank" rel="nofollow">
                                <Mail /> {m("email")}
                            </a>
                        </Button>
                    </motion.div>
                </div>
                <ContactForm />
            </div>
            <div className="w-full space-y-4">
                <Suspense fallback={"..."}>
                    <iframe
                        className="rounded-md *:bg-gradient-to-br *:from-meadow *:to-bangladesh"
                        title="Spotify Playlist: Lawful Exposure"
                        src="https://open.spotify.com/embed/playlist/75RCF0PBratBMhHadj0vnE?utm_source=generator&theme=0"
                        width="100%"
                        height="450"
                        frameBorder="0"
                        allowFullScreen=""
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                    />
                </Suspense>
                <p className="text-center">
                    <i>
                        <small>{m("music")}</small>
                    </i>
                </p>
            </div>
        </section>
    );
}
