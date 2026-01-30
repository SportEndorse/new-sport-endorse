import AboutUsContent from "../../../components/AboutUsContent";
import { Metadata } from "next";

export const dynamic = 'force-static';
export const revalidate = false;

export const metadata: Metadata = {
  title: "À propos de Sport Endorse - Plateforme mondiale de marketing sportif",
  description: "Sport Endorse est une plateforme mondiale de marketing sportif qui soutient l'industrie du sport dans le monde entier grâce à une équipe diversifiée d'experts réunissant marques et athlètes.",
  alternates: {
    canonical: "https://www.sportendorse.com/fr/about-us",
    languages: {
      'en-gb': 'https://www.sportendorse.com/about-us',
      'es-es': 'https://www.sportendorse.com/es/about-us',
      'de-de': 'https://www.sportendorse.com/de/about-us',
      'fr-fr': 'https://www.sportendorse.com/fr/about-us',
      'x-default': 'https://www.sportendorse.com/about-us'
    }
  },
  openGraph: {
    title: "À propos de Sport Endorse - Plateforme mondiale de marketing sportif",
    description: "Sport Endorse est une plateforme mondiale de marketing sportif qui soutient l'industrie du sport dans le monde entier grâce à une équipe diversifiée d'experts réunissant marques et athlètes.",
    type: "website",
    locale: "fr_FR",
    url: "https://www.sportendorse.com/fr/about-us",
    siteName: "Sport Endorse",
    alternateLocale: ['en_US', 'es_ES', 'de_DE'],
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

export default function AboutUsFR() {
  return <AboutUsContent />;
}