"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { BorderBeam } from "@/components/magicui/border-beam";
import { useActionState, useEffect } from "react";
import sendMail from "@/actions/send-mail";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export default function ContactForm() {
    const [state, action, isPending] = useActionState(sendMail, null);
    const m = useTranslations("ContactForm");

    useEffect(() => {
        if(state?.success) {
            toast(m("success"));
        } else if(state?.message === "fields_missing") {
            toast(m("missing_field"));
        }
    }, [state]);

    return (<form action={action} className="*:flex *:flex-col-reverse *:gap-y-2 space-y-4 relative overflow-hidden p-4 rounded-md">
        <Toaster/>
        <BorderBeam
            className="from-primary via-meadow to-primary"
            transition={{
                type: "spring",
                stiffness: 20,
                damping: 10,
            }}
        />
        <div>
            <Input name="name" id="name" required />
            <Label htmlFor="name">{m("name")}</Label>
        </div>
        <div>
            <Input name="email" id="email" type="email" />
            <Label htmlFor="email">{m("email")}</Label>
        </div>
        <div>
            <Textarea name="message" id="message" required />
            <Label htmlFor="message">{m("message")}</Label>
        </div>
        <Button className="!flex-row border-primary/65 text-primary" variant="outline" disabled={isPending}><Send /> {m("send")}</Button>
    </form>);
}