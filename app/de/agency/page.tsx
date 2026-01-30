import AgencyContent from "../../../components/AgencyContent";
import { Metadata } from "next";

export const dynamic = 'force-static';
export const revalidate = false;

export const metadata: Metadata = {
  title: "Sportagenten-Plattform für Athleten-Sponsorings | Sport Endorse",
  description: "Sport Endorses Endorsement-Management-Plattform hilft Sportagenten, Athleten-Sponsorings und Endorsement-Deals mit sicheren Kommunikations- und Compliance-Tools zu verwalten.",
  alternates: {
    canonical: "https://www.sportendorse.com/de/agency/",
    languages: {
      'en-gb': 'https://www.sportendorse.com/agency/',
      'es-es': 'https://www.sportendorse.com/es/agency/',
      'de-de': 'https://www.sportendorse.com/de/agency/',
      'fr-fr': 'https://www.sportendorse.com/fr/agency',
      'x-default': 'https://www.sportendorse.com/agency/'
    }
  },
  openGraph: {
    title: "Sportagenten-Plattform für Athleten-Sponsorings | Sport Endorse",
    description: "Sport Endorses Endorsement-Management-Plattform hilft Sportagenten, Athleten-Sponsorings und Endorsement-Deals mit sicheren Kommunikations- und Compliance-Tools zu verwalten.",
    type: "website",
    locale: "de_DE",
    url: "https://www.sportendorse.com/de/agency/",
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

export default function AgencyPageDE() {
  return <AgencyContent />;
}