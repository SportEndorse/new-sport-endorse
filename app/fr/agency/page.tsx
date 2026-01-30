import AgencyContent from "../../../components/AgencyContent";
import { Metadata } from "next";

export const dynamic = 'force-static';
export const revalidate = false;

export const metadata: Metadata = {
  title: "Plateforme d'agents sportifs pour les parrainages d'athlètes | Sport Endorse",
  description: "La plateforme de gestion des endorsements de Sport Endorse aide les agents sportifs à gérer les parrainages d'athlètes et les contrats d'endorsement avec des outils de communication sécurisée et de conformité.",
  alternates: {
    canonical: "https://www.sportendorse.com/fr/agency",
    languages: {
      'en-gb': 'https://www.sportendorse.com/agency',
      'es-es': 'https://www.sportendorse.com/es/agency',
      'de-de': 'https://www.sportendorse.com/de/agency',
      'fr-fr': 'https://www.sportendorse.com/fr/agency',
      'x-default': 'https://www.sportendorse.com/agency'
    }
  },
  openGraph: {
    title: "Plateforme d'agents sportifs pour les parrainages d'athlètes | Sport Endorse",
    description: "La plateforme de gestion des endorsements de Sport Endorse aide les agents sportifs à gérer les parrainages d'athlètes et les contrats d'endorsement avec des outils de communication sécurisée et de conformité.",
    type: "website",
    locale: "fr_FR",
    url: "https://www.sportendorse.com/fr/agency",
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

export default function AgencyPageFR() {
  return <AgencyContent />;
}