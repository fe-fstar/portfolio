"use client"

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { SquareMousePointer } from "lucide-react";
import { useTranslations } from "next-intl";

const projects = [
    {
        id: "tt",
        title: "Ticktasks",
        technologies: [{ name: "Sveltekit", expired: true }, { name: "Express.js", expired: true }, { name: "PostgreSQL", expired: true },
        { name: "Next.js", expired: false }, { name: "Laravel", expired: false }, { name: "MySQL", expired: false }, { name: "Tailwind", expired: false }],
    },
    {
        id: "em",
        title: "Exammeter",
        technologies: [{ name: "Sveltekit", expired: false }, { name: "Express.js", expired: false }, { name: "Tailwind", expired: false }],
    },
    {
        id: "te",
        title: "TicketEase",
        technologies: [{ name: "Sveltekit", expired: false }, { name: "Tailwind", expired: false }, { name: "OpenAI", expired: false }, { name: "Rest API", expired: false }],
    },
    {
        id: "mm",
        title: "MCBU Mobile",
        technologies: [{ name: "React Native", expired: false }, { name: "Express.js", expired: false }, { name: "OpenWeatherMap API", expired: false }],
    },
]

export default function Projects() {
    const [activeProject, setActiveProject] = useState(null);
    const m = useTranslations("Projects");

    return (
        <div className="w-[min(960px,95%)] mx-auto p-4">
            <Tabs value={activeProject} onValueChange={setActiveProject}>
                <TabsList className="grid w-full grid-cols-4 bg-transparent *:origin-bottom">
                    {projects.map((project) => (
                        <motion.div
                            key={project.id}
                            initial={{ rotateX: 90, opacity: 0 }}
                            whileInView={{ rotateX: 0, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 150, damping: 12 }}
                            viewport={{ amount: 0.8 }}
                        >
                            <TabsTrigger
                                value={project.id}
                                aria-label={project.title}
                                className="w-full max-sm:justify-start !truncate rounded-xl rounded-b-none clip-folder text-sm sm:text-base opacity-50 
                   data-[state='active']:opacity-100 !bg-card p-4"
                            >
                                {project.title}
                            </TabsTrigger>
                        </motion.div>
                    ))}
                </TabsList>

                {activeProject ? (
                    projects.map((project) =>
                        project.id === activeProject ? (
                            <TabsContent key={project.id} value={project.id}>
                                <Card className="rounded-t-none">
                                    <CardHeader>
                                        <CardTitle>{project.title}</CardTitle>
                                        <CardDescription>{m(`${project.id}.description`)}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="mb-4">{m(`${project.id}.details`)}</p>
                                        <div>
                                            <p className="text-sm font-semibold mb-2">{m("techStack")}:</p>
                                            <div className="flex flex-wrap gap-2">
                                                {project.technologies.map((tech, index) => (
                                                    <span key={index} className={cn("px-2 py-1 rounded-md text-xs", tech.expired ? "bg-destructive text-destructive-foreground" : "bg-primary text-primary-foreground")}>
                                                        {tech.name}
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
                        <p className="text-muted-foreground text-sm mt-2 flex items-center gap-x-[1ch]"><SquareMousePointer /> {m("initial.learnMore")}</p>
                    </div>
                )}
            </Tabs>
        </div>
    )
}

