import { getTranslations } from 'next-intl/server';
import { defaultLocale } from '@/i18n/config';
import LocaleSelect from '@/components/LocaleSelect';
import ContactSection from '@/components/ContactSection';
import HeroSection from '@/components/HeroSection';
import DescriptionSection from '@/components/DescriptionSection';
import ProjectsAndExperience from '@/components/ProjectsAndExperience';

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
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LocaleSelect className='absolute top-4 right-4 z-10' />
      <HeroSection />
      <DescriptionSection />
      <ProjectsAndExperience />
      <ContactSection />
    </main>
  );
}