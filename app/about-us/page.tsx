import AboutUsContent from "@/components/AboutUsContent";
import { Metadata } from "next";

export const dynamic = 'force-static';
export const revalidate = false;

export const metadata: Metadata = {
  title: "About Sport Endorse | Connecting Athletes with Brands Worldwide",
  description: "Learn about Sport Endorse's mission to bridge the gap between elite athletes and premium brands through authentic partnerships and innovative technology.",
  alternates: {
    canonical: "https://www.sportendorse.com/about-us",
    languages: {
      'en-gb': 'https://www.sportendorse.com/about-us',
      'es-es': 'https://www.sportendorse.com/es/about-us',
      'de-de': 'https://www.sportendorse.com/de/about-us',
      'x-default': 'https://www.sportendorse.com/about-us'
    }
  },
  openGraph: {
    title: "About Sport Endorse | Connecting Athletes with Brands Worldwide",
    description: "Learn about Sport Endorse's mission to bridge the gap between elite athletes and premium brands through authentic partnerships and innovative technology.",
    type: "website",
    locale: "en_US",
    url: "https://www.sportendorse.com/about-us",
    siteName: "Sport Endorse",
    alternateLocale: ['es_ES', 'de_DE']
  },
};

export default function AboutUs() {
  return <AboutUsContent />;
}