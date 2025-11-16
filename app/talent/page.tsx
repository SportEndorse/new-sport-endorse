import TalentContent from "@/components/TalentContent";
import { Metadata } from "next";

export const dynamic = 'force-static';
export const revalidate = false;

export const metadata: Metadata = {
  title: "Athletes & Influencers: Monetize Your Sports Career | Sport Endorse",
  description: "Join thousands of athletes earning through brand partnerships. Sport Endorse connects sports talent with premium brands for authentic sponsorship deals.",
  alternates: {
    canonical: "https://www.sportendorse.com/talent",
    languages: {
      'en-gb': 'https://www.sportendorse.com/talent',
      'es-es': 'https://www.sportendorse.com/es/talent',
      'de-de': 'https://www.sportendorse.com/de/talent',
      'x-default': 'https://www.sportendorse.com/talent'
    }
  },
  openGraph: {
    title: "Athletes & Influencers: Monetize Your Sports Career | Sport Endorse",
    description: "Join thousands of athletes earning through brand partnerships. Sport Endorse connects sports talent with premium brands for authentic sponsorship deals.",
    type: "website",
    locale: "en_US",
    url: "https://www.sportendorse.com/talent",
    siteName: "Sport Endorse",
    alternateLocale: ['es_ES', 'de_DE']
  },
};

export default function TalentPage() {
  return <TalentContent />;
}
