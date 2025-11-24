import AgencyContent from "@/components/AgencyContent";
import { Metadata } from "next";

export const dynamic = 'force-static';
export const revalidate = false;

export const metadata: Metadata = {
  title: "Sports Agent Platform for Athlete Sponsorships | Sport Endorse",
  description: "Sport Endorse's endorsement management platform helps sports agents manage athlete sponsorships and endorsement deals with secure communication and compliance tools.",
  alternates: {
    canonical: "https://www.sportendorse.com/agency",
    languages: {
      'en-gb': 'https://www.sportendorse.com/agency',
      'es-es': 'https://www.sportendorse.com/es/agency',
      'de-de': 'https://www.sportendorse.com/de/agency',
      'x-default': 'https://www.sportendorse.com/agency'
    }
  },
  openGraph: {
    title: "Sports Agent Platform for Athlete Sponsorships | Sport Endorse",
    description: "Sport Endorse's endorsement management platform helps sports agents manage athlete sponsorships and endorsement deals with secure communication and compliance tools.",
    type: "website",
    locale: "en_US",
    url: "https://www.sportendorse.com/agency",
    siteName: "Sport Endorse",
    alternateLocale: ['es_ES', 'de_DE']
  },
};

export default function AgencyPage() {
  return <AgencyContent />;
}
