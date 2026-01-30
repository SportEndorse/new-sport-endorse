import TermsAndConditionsContent from "@/components/TermsAndConditionsContent";
import { Metadata } from "next";

export const dynamic = 'force-static';
export const revalidate = false;

export const metadata: Metadata = {
  title: "Terms & Conditions | Sport Endorse",
  description: "Sport Endorse Limited Terms And Conditions Updated: November 2024",
  alternates: {
    canonical: "https://www.sportendorse.com/terms-and-conditions",
    languages: {
      'en': "https://www.sportendorse.com/terms-and-conditions",
      'es': "https://www.sportendorse.com/es/terms-and-conditions",
      'de': "https://www.sportendorse.com/de/terms-and-conditions",
      'fr': "https://www.sportendorse.com/fr/terms-and-conditions"
    }
  },
  openGraph: {
    title: "Terms & Conditions | Sport Endorse",
    description: "Sport Endorse Limited Terms And Conditions Updated: November 2024",
    type: "website",
    locale: "en_US",
    url: "https://www.sportendorse.com/terms-and-conditions",
    siteName: "Sport Endorse",
    images: [
      {
        url: "https://www.sportendorse.com/images/sportEndorseLogo-min.png",
        width: 1200,
        height: 630,
        alt: "Sport Endorse logo",
      },
    ],
  }
};

export default function TermsAndConditions() {
  return (
    <TermsAndConditionsContent />
  );
}