"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
} from "@/components/ui/select";
import { useParams } from "next/navigation";
import { usePathname, useRouter } from "@/i18n/routing";
import { locales } from "@/i18n/config";
import { useLocale } from "next-intl";
import { useTransition } from "react";
import { cn } from "@/lib/utils";

export default function LocaleSelect({ className = "" }) {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const params = useParams();
    const [isPending, startTransition] = useTransition();

    function onSelectChange(event) {
        const nextLocale = event;
        startTransition(() => {
            router.replace(
                { pathname, params },
                { locale: nextLocale }
            );
        });
    }

    return (
        <Select
            defaultValue={locale}
            disabled={isPending}
            onValueChange={onSelectChange}>
            <SelectTrigger id="language" aria-label="Language" className={cn(className, "w-[100px]")}>
                {locale.toUpperCase()}
            </SelectTrigger>
            <SelectContent>
                {locales.map(localeItem =>
                    <SelectItem key={localeItem} value={localeItem}>{localeItem.toUpperCase()}</SelectItem>
                )}
            </SelectContent>
        </Select>
    );
}