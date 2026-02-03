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
      'fr-fr': 'https://www.sportendorse.com/fr/about-us',
      'x-default': 'https://www.sportendorse.com/about-us'
    }
  },
  openGraph: {
    title: "Über Sport Endorse - Globale Sportmarketing-Plattform",
    description: "Sport Endorse ist eine globale Sportmarketing-Plattform, die die Sportbranche weltweit durch ein vielfältiges Expertenteam unterstützt, das Marken und Athleten vereint.",
    type: "website",
    locale: "de_DE",
    url: "https://www.sportendorse.com/de/about-us",
    siteName: "Sport Endorse",
    alternateLocale: ['en_US', 'es_ES', 'fr_FR'],
    images: [
      {
        url: "https://www.sportendorse.com/images/sportEndorseLogo-min.png",
        width: 1200,
        height: 630,
        alt: "Sport Endorse logo",
      },
    ],
  },
};

export default function AboutUsDE() {
  return <AboutUsContent />;
}