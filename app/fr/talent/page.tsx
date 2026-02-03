import TalentContent from "../../../components/TalentContent";
import { Metadata } from "next";

export const dynamic = 'force-static';
export const revalidate = false;

export const metadata: Metadata = {
  title: "Rejoignez notre marketplace d'athlètes et postulez à des parrainages",
  description: "Inscrivez-vous sur Sport Endorse pour vous connecter avec des marques, trouver des opportunités de parrainage d'athlètes, postuler à des accords, obtenir des sponsors et développer votre influence dans l'industrie.",
  alternates: {
    canonical: "https://www.sportendorse.com/fr/talent",
    languages: {
      'en-gb': 'https://www.sportendorse.com/talent',
      'es-es': 'https://www.sportendorse.com/es/talent',
      'de-de': 'https://www.sportendorse.com/de/talent',
      'fr-fr': 'https://www.sportendorse.com/fr/talent',
      'x-default': 'https://www.sportendorse.com/talent'
    }
  },
  openGraph: {
    title: "Rejoignez notre marketplace d'athlètes et postulez à des parrainages",
    description: "Inscrivez-vous sur Sport Endorse pour vous connecter avec des marques, trouver des opportunités de parrainage d'athlètes, postuler à des accords, obtenir des sponsors et développer votre influence dans l'industrie.",
    type: "website",
    locale: "fr_FR",
    url: "https://www.sportendorse.com/fr/talent",
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

export default function TalentPageFR() {
  return <TalentContent />;
}