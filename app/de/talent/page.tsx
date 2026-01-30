import TalentContent from "../../../components/TalentContent";
import { Metadata } from "next";

export const dynamic = 'force-static';
export const revalidate = false;

export const metadata: Metadata = {
  title: "Treten Sie Unserem Athleten-Marktplatz Bei Und Bewerben Sie Sich Für Sponsorings",
  description: "Registrieren Sie sich bei Sport Endorse, um sich mit Marken zu verbinden, Athleten-Sponsoring-Möglichkeiten zu finden, sich auf Deals zu bewerben, gesponsert zu werden und Ihren Einfluss in der Branche zu steigern.",
  alternates: {
    canonical: "https://www.sportendorse.com/de/talent/",
    languages: {
      'en-gb': 'https://www.sportendorse.com/talent/',
      'es-es': 'https://www.sportendorse.com/es/talent/',
      'de-de': 'https://www.sportendorse.com/de/talent/',
      'fr-fr': 'https://www.sportendorse.com/fr/talent',
      'x-default': 'https://www.sportendorse.com/talent/'
    }
  },
  openGraph: {
    title: "Treten Sie unserem Athleten-Marktplatz bei und bewerben Sie sich für Sponsorings",
    description: "Registrieren Sie sich bei Sport Endorse, um sich mit Marken zu verbinden, Athleten-Sponsoring-Möglichkeiten zu finden, sich für Deals zu bewerben, Sponsorings zu erhalten und Ihren Einfluss in der Branche zu vergrößern.",
    type: "website",
    locale: "de_DE",
    url: "https://www.sportendorse.com/de/talent/",
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

export default function TalentPageDE() {
  return <TalentContent />;
}