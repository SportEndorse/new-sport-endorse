import AgencyContent from "@/components/AgencyContent";
import { Metadata } from "next";

export const dynamic = 'force-static';
export const revalidate = false;

export const metadata: Metadata = {
  title: "Partner with Sport Endorse | Sports Agency Solutions",
  description: "Join Sport Endorse as a sports agency partner. Connect your athletes with premium brands and unlock new revenue opportunities through our platform.",
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
    title: "Partner with Sport Endorse | Sports Agency Solutions",
    description: "Join Sport Endorse as a sports agency partner. Connect your athletes with premium brands and unlock new revenue opportunities through our platform.",
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
