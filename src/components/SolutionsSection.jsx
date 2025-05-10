import { useMessages, useTranslations } from "next-intl";
import { Marquee } from "./magicui/marquee";
import { BoxReveal } from "@/components/magicui/box-reveal";
import { Alien, Eye, PunchedPlus } from "./Icons";

export default function SolutionsSection() {
    const kv = useMessages();
    const m = useTranslations("Solutions");

    return <section className="w-full min-h-page flex flex-col justify-between gap-y-8 items-center overflow-x-hidden">
        <Marquee pauseOnHover reverse className="bg-gradient-to-r from-[#FF416C] to-[#FF4B2B] text-2xl lg:text-4xl py-4" style={{ "--gap": "4vw" }}>
            <strong>Furkan Eryılmaz</strong>
            <span><Alien className="size-9 fill-foreground"/></span>
            <strong>{m("role")}</strong>
            <span><Alien className="size-9 fill-foreground"/></span>
        </Marquee>
        <div className="flex flex-col justify-center items-center gap-y-8 w-[min(1200px,95%)]">
            <BoxReveal>
                <h2>
                    {m("title")}
                    <span className="text-primary">.</span>
                </h2>
            </BoxReveal>
            <BoxReveal>
                <p><Eye className="size-6 inline fill-primary"/> {m("descriptionTitle")}</p>
            </BoxReveal>
            <ul className="space-y-4">
                {Object.values(kv?.Solutions?.descriptionList)?.map((text, index) => <li key={index}>
                    <BoxReveal duration={1 + index * 0.167}>💚 {text}</BoxReveal>
                </li>)}
            </ul>
        </div>
        <Marquee pauseOnHover className="bg-gradient-to-r from-[#00C9FF] to-[#92FE9D] text-xl lg:text-3xl py-2" style={{ "--gap": "3vw" }}>
            {Object.values(kv?.Solutions?.items)?.map((text, index) => <span key={index} className="contents">
                <span>{text}</span>
                <span className="grid place-items-center"><PunchedPlus className="size-9 fill-foreground"/></span>
            </span>)}
        </Marquee>
    </section>;
}