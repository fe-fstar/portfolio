import { useTranslations } from "next-intl";
import FStar from "./ui/fstar";
import Spark from "./ui/spark";

export default function HeroSection() {
    const m = useTranslations("HeroSection");

    return <section className="w-full min-h-screen flex flex-col justify-center items-center text-center text-balance gap-y-8">
        <h1>Furkan <FStar className="size-32 inline *:fill-none" /> Eryılmaz</h1>
        <h2>{m.rich('title', {
            end: (chunks) => <span className="relative">{chunks}<Spark className="absolute -top-6 -right-8 size-12" /></span>
        })}</h2>
    </section>
}