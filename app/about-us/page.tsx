import AboutUsContent from "@/components/AboutUsContent";
import { Metadata } from "next";

export const dynamic = 'force-static';
export const revalidate = false;

export const metadata: Metadata = {
  title: "About Sport Endorse - Global Sports Marketing Platform",
  description: "Sport Endorse is a global sports marketing platform supporting the sports industry worldwide through a diverse team of experts uniting brands and athletes.",
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
    title: "About Sport Endorse - Global Sports Marketing Platform",
    description: "Sport Endorse is a global sports marketing platform supporting the sports industry worldwide through a diverse team of experts uniting brands and athletes.",
    type: "website",
    locale: "en_US",
    url: "https://www.sportendorse.com/about-us",
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

export default function AboutUs() {
  return <AboutUsContent />;
}