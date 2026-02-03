import HomeContent from "../../components/HomeContent";
import { Metadata } from "next";

export const dynamic = 'force-static';
export const revalidate = false;

export const metadata: Metadata = {
  title: "Sport-Sponsoring-Plattform für Marken- und Athleten-Partnerschaften",
  description: "Sport Endorse ist eine Sport-Sponsoring-Plattform, auf der Marken und Athleten sich verbinden, zusammenarbeiten und authentische Sport-Marketing-Partnerschaften verwalten.",
  alternates: {
    canonical: "https://www.sportendorse.com/de/",
    languages: {
      'en-gb': 'https://www.sportendorse.com/',
      'es-es': 'https://www.sportendorse.com/es/',
      'de-de': 'https://www.sportendorse.com/de/',
      'fr-fr': 'https://www.sportendorse.com/fr/',
      'x-default': 'https://www.sportendorse.com/'
    }
  },
  openGraph: {
    title: "Sport-Sponsoring-Plattform für Marken- und Athleten-Partnerschaften",
    description: "Sport Endorse ist eine Sport-Sponsoring-Plattform, auf der Marken und Athleten sich verbinden, zusammenarbeiten und authentische Sport-Marketing-Partnerschaften verwalten.",
    type: "website",
    locale: "de_DE",
    url: "https://www.sportendorse.com/de/",
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

export default function HomePageDE() {
  return <HomeContent />;
}