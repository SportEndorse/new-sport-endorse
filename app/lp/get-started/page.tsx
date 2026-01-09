import GetStartedContent from "@/components/GetStartedContent";
import translations from "@/utils/translations";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Sports Agent Platform for Athlete Sponsorships | Sport Endorse",
  description: "Sport Endorse's endorsement management platform helps sports agents manage athlete sponsorships and endorsement deals with secure communication and compliance tools.",
  alternates: {
    canonical: "https://www.sportendorse.com/lp/get-started",
    languages: {
      'en-gb': 'https://www.sportendorse.com/lp/get-started',
      'es-es': 'https://www.sportendorse.com/lp/get-started',
      'de-de': 'https://www.sportendorse.com/lp/get-started',
      'x-default': 'https://www.sportendorse.com/lp/get-started'
    }
  },
  openGraph: {
    title: "Sports Agent Platform for Athlete Sponsorships | Sport Endorse",
    description: "Sport Endorse's endorsement management platform helps sports agents manage athlete sponsorships and endorsement deals with secure communication and compliance tools.",
    type: "website",
    locale: "en_US",
    url: "https://www.sportendorse.com/lp/get-started",
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

export default function GetStartedPage() {
    const t = translations.en.brands;

  return <GetStartedContent 
      title={"Find & Endorse Athletes for Brand Campaigns & Partnerships"}
      description={t.description}
      featuredAthletes={t.featuredAthletes}
      viewAll={t.viewAll}
      buttonTitle={"START FREE TRIAL"}
    />;
}

// Force static generation
export const dynamic = 'force-static';
export const revalidate = false;
