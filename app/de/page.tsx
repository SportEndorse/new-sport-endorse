import HomeContent from "../../components/HomeContent";
import { Metadata } from "next";

export const dynamic = 'force-static';
export const revalidate = false;

export const metadata: Metadata = {
  title: "Sport Endorse | Verbinde Marken mit Elite-Athleten & Sport-Influencern",
  description: "Sport Endorse ist die Plattform, die Marken und Athleten für authentische und wirkungsvolle Partnerschaften zusammenbringt. Wir machen es einfach für Marken, das richtige Talent zu finden und mit ihm zu kollaborieren, und für Athleten, sich direkt mit Marken zu verbinden und bezahlte Deals zu sichern.",
  alternates: {
    canonical: "https://www.sportendorse.com/de/",
    languages: {
      'en-gb': 'https://www.sportendorse.com/',
      'es-es': 'https://www.sportendorse.com/es/',
      'de-de': 'https://www.sportendorse.com/de/',
      'x-default': 'https://www.sportendorse.com/'
    }
  },
  openGraph: {
    title: "Sport Endorse | Verbinde Marken mit Elite-Athleten & Sport-Influencern",
    description: "Sport Endorse ist die Plattform, die Marken und Athleten für authentische und wirkungsvolle Partnerschaften zusammenbringt. Wir machen es einfach für Marken, das richtige Talent zu finden und mit ihm zu kollaborieren, und für Athleten, sich direkt mit Marken zu verbinden und bezahlte Deals zu sichern.",
    type: "website",
    locale: "de_DE",
    url: "https://www.sportendorse.com/de/",
    siteName: "Sport Endorse",
    alternateLocale: ['en_US', 'es_ES']
  },
};

export default function HomePageDE() {
  return <HomeContent />;
}