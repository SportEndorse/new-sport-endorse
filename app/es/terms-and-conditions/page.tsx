import TermsAndConditionsContent from "@/components/TermsAndConditionsContent";
import { Metadata } from "next";

export const dynamic = 'force-static';
export const revalidate = false;

export const metadata: Metadata = {
  title: "Términos y Condiciones | Sport Endorse",
  description: "Sport Endorse Limited Terms And Conditions Updated: November 2024",
  alternates: {
    canonical: "https://www.sportendorse.com/es/terms-and-conditions",
    languages: {
      'en': "https://www.sportendorse.com/terms-and-conditions",
      'es': "https://www.sportendorse.com/es/terms-and-conditions",
      'de': "https://www.sportendorse.com/de/terms-and-conditions"
    }
  },
  openGraph: {
    title: "Términos y Condiciones | Sport Endorse",
    description: "Sport Endorse Limited Terms And Conditions Updated: November 2024",
    type: "website",
    locale: "es_ES",
    siteName: "Sport Endorse"
  }
};

export default function TermsAndConditionsPage() {
  return (
    <TermsAndConditionsContent />
  );
}