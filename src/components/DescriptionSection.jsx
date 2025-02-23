"use client";

import { useRef } from "react";
import { AnimatedSpan, Terminal, TypingAnimation } from "@/components/magicui/terminal";
import { WordRotate } from "@/components/magicui/word-rotate";
import { DrawnArrow, ShootingStar } from "@/components/Icons";
import { RainbowButton } from "@/components/magicui/rainbow-button";
import { useMessages, useTranslations } from "next-intl";

export default function DescriptionSection() {
    const m = useTranslations("DescriptionSection");
    const r = useMessages();
    const rotatedWords = Object.values(r?.DescriptionSection?.rotation)
    const sectionRef = useRef(null);

    return (
        <section ref={sectionRef} className="w-[min(1200px,95%)] min-h-screen mx-auto flex max-lg:flex-col justify-center items-start gap-x-8 gap-y-16 max-lg:pb-32 overflow-hidden">
            <div className="basis-3/5">
                <h2 className="flex flex-wrap break-words gap-x-[1ch]">{
                    m.rich('title', {
                        rotate: _ => <WordRotate words={rotatedWords} />,
                    })}
                </h2>
                <p className="text-left text-balance"><ShootingStar className="inline fill-primary size-12 -my-[.625rem] origin-center" style={{ transform: "rotateY(180deg)" }} /> {
                    m.rich('description', {
                        primary: (chunks) => <span className="text-primary">{chunks}</span>,
                        underline: (chunks) => <span className="underline">{chunks}</span>
                    })
                }</p>
            </div>
            <div className="basis-2/5 w-full space-y-8 flex flex-col max-lg:items-center">
                <Terminal className="text-left">
                    <TypingAnimation duration={50}>
                        &gt; didyouknow f-star
                    </TypingAnimation>
                    <AnimatedSpan delay={1250}>
                        <span className="text-green-500">✔ {m("didYouKnowFStar")}</span>
                    </AnimatedSpan>
                </Terminal>
                <div className="w-fit relative">
                    <RainbowButton className="text-foreground" asChild>
                        <a href="/Furkan-Eryılmaz-Resumé.pdf" target="_blank" rel="noindex nofollow">{m("myResume")}</a>
                    </RainbowButton>
                    <div className="absolute left-[85%] top-[75%]">
                        <DrawnArrow className="size-32 max-sm:size-20" />
                        <span className="float-left text-right -translate-x-[90%] -translate-y-[75%]">{m("tldr")}</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
