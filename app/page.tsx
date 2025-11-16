import HomeContent from "@/components/HomeContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sport Endorse | Connect Brands with Elite Athletes & Sports Influencers",
  description: "Sport Endorse is the platform that brings brands and athletes together for authentic and impactful partnerships. We make it easy for brands to find and collaborate with the right talent, and for athletes to connect directly with brands and secure paid deals.",
  alternates: {
    canonical: "https://www.sportendorse.com/",
    languages: {
      'en-gb': 'https://www.sportendorse.com/',
      'es-es': 'https://www.sportendorse.com/es/',
      'de-de': 'https://www.sportendorse.com/de/',
      'x-default': 'https://www.sportendorse.com/'
    }
  },
  openGraph: {
    title: "Sport Endorse | Connect Brands with Elite Athletes & Sports Influencers",
    description: "Sport Endorse is the platform that brings brands and athletes together for authentic and impactful partnerships. We make it easy for brands to find and collaborate with the right talent, and for athletes to connect directly with brands and secure paid deals.",
    type: "website",
    locale: "en_US",
    url: "https://www.sportendorse.com/",
    siteName: "Sport Endorse",
    alternateLocale: ['es_ES', 'de_DE']
  },
};

export default function HomePage() {
  return <HomeContent />;
}

// Force static generation
export const dynamic = 'force-static';
export const revalidate = false;