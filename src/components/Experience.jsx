"use client"

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { ArrowUpRight, SquareMousePointer } from "lucide-react";
import { useMessages, useTranslations } from "next-intl";

const experiences = [
    {
        id: "geliver",
        title: "Geliver",
        icon: "bg-[url('/geliver.svg')]",
        technologies: ["Sveltekit", "Tailwind", "Node.js"],
    },
    {
        id: "rmos",
        title: "RMOS Yazılım",
        icon: "bg-[url('/rmos.svg')]",
        technologies: ["Flask", "Next.js", "Tailwind", "Docker"],
    },
    {
        id: "pellaglobal",
        title: "Pella Global Net",
        icon: "bg-[url('/pellaglobal.svg')]",
        technologies: ["Nextjs", "Tailwind", "Laravel", "MySQL", "seo"],
    },
]

export default function Experience() {
    const [activeExperience, setActiveExperience] = useState(null);
    const m = useTranslations("Experience");
    const messages = useMessages();

    return (
        <div className="w-[min(960px,95%)] mx-auto p-4">
            <h3 className="sr-only">{m("title")}</h3>
            <Tabs value={activeExperience} onValueChange={setActiveExperience}>
                <TabsList className="grid w-full grid-cols-3 bg-transparent *:origin-bottom">
                    {experiences.map((experience) => (
                        <motion.div
                            key={experience.id}
                            initial={{ rotateX: 90, opacity: 0 }}
                            whileInView={{ rotateX: 0, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 150, damping: 12 }}
                            viewport={{ amount: 0.8 }}
                        >
                            <TabsTrigger
                                value={experience.id}
                                aria-label={experience.title}
                                className="w-full rounded-xl rounded-b-none clip-folder text-sm sm:text-base opacity-50 
                   data-[state='active']:opacity-100 !bg-card p-4"
                            >
                                <div className={cn(experience.icon, "w-full h-9 bg-contain bg-no-repeat bg-center")} />
                            </TabsTrigger>
                        </motion.div>
                    ))}
                </TabsList>

                {activeExperience ? (
                    // Show selected experience details
                    experiences.map((experience) =>
                        experience.id === activeExperience ? (
                            <TabsContent key={experience.id} value={experience.id}>
                                <Card className="rounded-t-none">
                                    <CardHeader>
                                        <CardTitle>
                                            <a href={m(`${experience.id}.link`)} target="_blank" className="flex items-center gap-x-2">{experience.title} <ArrowUpRight /></a>
                                        </CardTitle>
                                        <CardDescription>{m(`${experience.id}.description`)}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        {Object.values(messages.Experience[experience.id].details).map((detail, index) => <p key={index} className="mb-4 max-sm:text-[10px]">{detail}</p>)}
                                        <div>
                                            <h4 className="text-sm max-sm:text-xs font-semibold mb-2">{m("techStack")}:</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {experience.technologies.map((tech, index) => (
                                                    <span key={index} className="bg-primary text-primary-foreground px-2 py-1 rounded-md text-xs">
                                                        {tech === "seo"
                                                            ?
                                                            m.rich('seo', {
                                                                spoiler: (chunks) => <span className="relative before:z-10 before:bg-black before:absolute before:top-0 before:left-0 before:w-full before:h-full hover:before:invisible">{chunks}</span>
                                                            })
                                                            :
                                                            tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        ) : null
                    )
                ) : (
                    <div className="flex flex-col items-center justify-center p-8 border border-dashed border-border rounded-md bg-card">
                        <p className="text-xl font-semibold">{m("initial.getStarted")}</p>
                        <p className="text-muted-foreground text-sm mt-2 flex items-center gap-x-[1ch]"><SquareMousePointer size={16} /> {m("initial.learnMore")}</p>
                    </div>
                )}
            </Tabs>
        </div>
    )
}

