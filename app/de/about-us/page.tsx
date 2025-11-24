import AboutUsContent from "../../../components/AboutUsContent";
import { Metadata } from "next";

export const dynamic = 'force-static';
export const revalidate = false;

export const metadata: Metadata = {
  title: "Über Sport Endorse - Globale Sport-Marketing-Plattform",
  description: "Sport Endorse ist eine globale Sport-Marketing-Plattform, die die Sportindustrie weltweit durch ein vielfältiges Team von Experten unterstützt, die Marken und Athleten vereinen.",
  alternates: {
    canonical: "https://www.sportendorse.com/de/about-us",
    languages: {
      'en-gb': 'https://www.sportendorse.com/about-us',
      'es-es': 'https://www.sportendorse.com/es/about-us',
      'de-de': 'https://www.sportendorse.com/de/about-us',
      'x-default': 'https://www.sportendorse.com/about-us'
    }
  },
  openGraph: {
    title: "Über Sport Endorse - Globale Sport-Marketing-Plattform",
    description: "Sport Endorse ist eine globale Sport-Marketing-Plattform, die die Sportindustrie weltweit durch ein vielfältiges Team von Experten unterstützt, die Marken und Athleten vereinen.",
    type: "website",
    locale: "de_DE",
    url: "https://www.sportendorse.com/de/about-us",
    siteName: "Sport Endorse",
    alternateLocale: ['en_US', 'es_ES']
  },
};

export default function AboutUsDE() {
  return <AboutUsContent />;
}