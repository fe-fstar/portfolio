import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Press_Start_2P } from "next/font/google";
import "./globals.css";
import ScrollIndicator from '@/components/ScrollIndicator';

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
});

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const locale = (await params).locale;

  return {
    locale: locale,
    type: "website",
    sitename: "Furkan Eryılmaz",
    metadataBase: new URL("https://fstar.dev"),
  };
}

export default async function LocaleLayout({ children, params }) {
  const locale = (await params).locale;
  if (!routing.locales.includes(locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${pressStart2P.className}`}>
      <body>
        <ScrollIndicator />
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
