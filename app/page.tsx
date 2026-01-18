import HomeContent from "@/components/HomeContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sports Sponsorship Platform for Brand & Athlete Partnerships",
  description: "Sport Endorse is a sport sponsorship platform where brands and athletes connect, collaborate, and manage authentic sports marketing partnerships.",
  alternates: {
    canonical: "https://www.sportendorse.com/",
    languages: {
      'en-gb': 'https://www.sportendorse.com/',
      'es-es': 'https://www.sportendorse.com/es/',
      'de-de': 'https://www.sportendorse.com/de/',
      'fr-fr': 'https://www.sportendorse.com/fr/',
      'x-default': 'https://www.sportendorse.com/'
    }
  },
  openGraph: {
    title: "Sports Sponsorship Platform for Brand & Athlete Partnerships",
    description: "Sport Endorse is a sport sponsorship platform where brands and athletes connect, collaborate, and manage authentic sports marketing partnerships.",
    type: "website",
    locale: "en_US",
    url: "https://www.sportendorse.com/",
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

export default function HomePage() {
  return <HomeContent />;
}

// Force static generation
export const dynamic = 'force-static';
export const revalidate = false;