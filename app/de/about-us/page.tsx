import AboutUsContent from "../../../components/AboutUsContent";
import { Metadata } from "next";

export const dynamic = 'force-static';
export const revalidate = false;

export const metadata: Metadata = {
  title: "Über Sport Endorse | Athleten mit Marken weltweit verbinden",
  description: "Erfahren Sie mehr über Sport Endorses Mission, Elite-Athleten durch authentische Partnerschaften und innovative Technologie mit Premium-Marken zu verbinden.",
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
    title: "Über Sport Endorse | Athleten mit Marken weltweit verbinden",
    description: "Erfahren Sie mehr über Sport Endorses Mission, Elite-Athleten durch authentische Partnerschaften und innovative Technologie mit Premium-Marken zu verbinden.",
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