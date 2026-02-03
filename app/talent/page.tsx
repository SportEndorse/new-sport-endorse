import TalentContent from "@/components/TalentContent";
import { Metadata } from "next";

export const dynamic = 'force-static';
export const revalidate = false;

export const metadata: Metadata = {
  title: "Join Our Athlete Marketplace and Apply for Sponsorships",
  description: "Register on Sport Endorse to connect with brands, find athlete sponsorship opportunities, apply for deals, get sponsored, and grow your influence in industry.",
  alternates: {
    canonical: "https://www.sportendorse.com/talent",
    languages: {
      'en-gb': 'https://www.sportendorse.com/talent',
      'es-es': 'https://www.sportendorse.com/es/talent',
      'de-de': 'https://www.sportendorse.com/de/talent',
      'fr-fr': 'https://www.sportendorse.com/fr/talent',
      'x-default': 'https://www.sportendorse.com/talent'
    }
  },
  openGraph: {
    title: "Join Our Athlete Marketplace and Apply for Sponsorships",
    description: "Register on Sport Endorse to connect with brands, find athlete sponsorship opportunities, apply for deals, get sponsored, and grow your influence in industry.",
    type: "website",
    locale: "en_US",
    url: "https://www.sportendorse.com/talent",
    siteName: "Sport Endorse",
    alternateLocale: ['es_ES', 'de_DE', 'fr_FR'],
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

export default function TalentPage() {
  return <TalentContent />;
}
