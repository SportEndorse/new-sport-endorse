import SharksPlayerFormContent from "@/components/SharksPlayerFormContent";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Sports Agent Platform for Athlete Sponsorships | Sport Endorse",
  description: "Sport Endorse's endorsement management platform helps sports agents manage athlete sponsorships and endorsement deals with secure communication and compliance tools.",
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: "https://www.sportendorse.com/lp/sharks-player-form",
    languages: {
      'en-gb': 'https://www.sportendorse.com/lp/sharks-player-form',
      'es-es': 'https://www.sportendorse.com/lp/sharks-player-form',
      'de-de': 'https://www.sportendorse.com/lp/sharks-player-form',
      'x-default': 'https://www.sportendorse.com/lp/sharks-player-form'
    }
  },
  openGraph: {
    title: "Sports Agent Platform for Athlete Sponsorships | Sport Endorse",
    description: "Sport Endorse's endorsement management platform helps sports agents manage athlete sponsorships and endorsement deals with secure communication and compliance tools.",
    type: "website",
    locale: "en_US",
    url: "https://www.sportendorse.com/lp/sharks-player-form",
    siteName: "Sport Endorse",
    alternateLocale: ['es_ES', 'de_DE'],
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

export default function SharksPlayerFormPage() {
  return <SharksPlayerFormContent />
}

// Force static generation
export const dynamic = 'force-static';
export const revalidate = false;
