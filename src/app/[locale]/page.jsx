import RetroGrid from '@/components/ui/retro-grid';
import InteractiveHoverButton from '@/components/ui/interactive-hover-button';
import { GitHub, LinkedIn } from '@/components/Icons';
import { getTranslations } from 'next-intl/server';
import { Mail } from 'lucide-react';
import { defaultLocale } from '@/i18n/config';
import LocaleSelect from '@/components/LocaleSelect';

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

export default async function HomePage({ params }) {
  const locale = (await params).locale;
  const m = await getTranslations("HomePage");
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Furkan Eryılmaz",
    "alternateName": "F* (F-Star)",
    "jobTitle": m("jobTitle"),
    "worksFor": {
      "@type": "Organization",
      "name": m("companyName"),
      "url": `https://pellaglobal.net${locale === "en" ? "" : `/${locale}`}`
    },
    "url": `https://fstar.dev${locale === defaultLocale ? "" : `/${locale}`}`,
    "sameAs": [
      "https://www.linkedin.com/in/furkane/",
      "https://github.com/fe-fstar",
    ],
    "knowsAbout": [
      "HTML",
      "CSS",
      "Tailwind",
      "Bootstrap",
      "JavaScript",
      "Python",
      "React",
      "Next.js",
      "SvelteKit",
      "Laravel",
      "Node.js",
      "PostgreSQL",
      "MySQL",
      m("frontend"),
      m("backend"),
      m("fullstack"),
    ],
    "skills": [
      m("optimization"),
      m("multilanguage"),
      "SEO",
      m("responsive")
    ],
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": m("university")
    },
    "gender": "Male",
    "description": m("description")
  }

  return (
    <main className='w-screen h-screen grid place-items-center'>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className='flex flex-col items-center justify-center gap-y-8 w-[min(1024px,95%)]'>
        <div className="text-center text-balance space-y-4">
          <h1 className='scroll-m-20 text-4xl font-goldman font-extrabold tracking-tight lg:text-5xl'>Furkan Eryılmaz</h1>
          <h2 className='scroll-m-20 text-3xl font-goldman font-bold tracking-tight'>
            {m.rich("title", {
              gradient: (chunks) => (
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FFFCCE] via-primary to-[#FFFCCE] bg-[length:500%_auto] animate-[text-flow_4s_ease-in-out_infinite_reverse]">
                  {chunks}
                </span>
              ),
            })}
          </h2>
        </div>
        <p className='leading-7 text-center text-balance'>{m("paragraph")}</p>
        <div className="flex gap-x-16 gap-y-4 justify-center items-center flex-wrap">
          <a href="mailto:furkane.kolta@gmail.com" title={m("email")} target='_blank'><InteractiveHoverButton text={m("email")} icon={<Mail className='size-8' strokeWidth={1.5} />} className="w-36 border-primary/30" /></a>
          <a href="https://github.com/fe-fstar" title='Furkan Eryılmaz GitHub' target='_blank'><InteractiveHoverButton text="GitHub" icon={<GitHub className='size-8' />} className="border-primary/30" /></a>
          <a href="https://www.linkedin.com/in/furkane/" title='Furkan Eryılmaz LinkedIn' target='_blank'><InteractiveHoverButton text="LinkedIn" icon={<LinkedIn className='size-8' />} className="w-40 *:has-[svg]:gap-4 border-primary/30" /></a>
        </div>
        <LocaleSelect className='absolute top-4 right-4' />
        <RetroGrid />
      </div>
    </main>
  );
}