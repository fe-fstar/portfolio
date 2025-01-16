import RetroGrid from '@/components/ui/retro-grid';
import { LineShadowText } from '@/components/ui/line-shadow-text';
import InteractiveHoverButton from '@/components/ui/interactive-hover-button';
import { GitHub, LinkedIn } from '@/components/Icons';
import { getTranslations } from 'next-intl/server';
import { Mail } from 'lucide-react';
import { defaultLocale } from '@/i18n/config';

export async function generateMetadata({ params }) {
  const locale = (await params).locale;
  const m = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: m("title"),
    description: m("description"),
    sitename: "Furkan Eryılmaz",
    openGraph: {
      title: m("title"),
      description: m("description"),
    },
    twitter: {
      title: m("title"),
      description: m("description"),
    },
    alternates: {
      canonical: `${locale === defaultLocale ? "/" : `/${locale}`}`,
      languages: {
        "x-default": "/",
        "en": "/",
        "tr": "/tr"
      }
    }
  };
}

export default async function HomePage() {
  const m = await getTranslations("HomePage");
  return (
    <main className='w-screen h-screen grid place-items-center'>
      <div className='flex flex-col items-center justify-center gap-y-8 w-[min(1024px,95%)]'>
        <div className="text-center space-y-4">
          <h1 className='scroll-m-20 text-4xl font-goldman font-extrabold tracking-tight lg:text-5xl'>Furkan Eryılmaz</h1>
          <h2 className='scroll-m-20 text-3xl font-semibold tracking-tight'>
            {m.rich("title", {
              shadowed: (text) => <LineShadowText shadowColor='hsl(var(--primary))'>{text}</LineShadowText>
            })}
          </h2>
        </div>
        <p className='leading-7 text-center text-balance'>{m("paragraph")}</p>
        <div className="flex gap-x-16 justify-center items-center">
          <a href="mailto:furkane.kolta@gmail.com" title={m("email")} target='_blank'><InteractiveHoverButton text={m("email")} icon={<Mail className='size-8' strokeWidth={1.5} />} className="w-36 border-primary/30" /></a>
          <a href="https://github.com/fe-fstar" title='Furkan Eryılmaz GitHub' target='_blank'><InteractiveHoverButton text="GitHub" icon={<GitHub className='size-8' />} className="border-primary/30" /></a>
          <a href="https://www.linkedin.com/in/furkane/" title='Furkan Eryılmaz LinkedIn' target='_blank'><InteractiveHoverButton text="LinkedIn" icon={<LinkedIn className='size-8' />} className="w-40 *:has-[svg]:gap-4 border-primary/30" /></a>
        </div>
        <RetroGrid />
      </div>
    </main>
  );
}