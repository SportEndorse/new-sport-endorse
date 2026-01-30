import CalendlyDemo from "@/components/CalendlyDemo";
import FAQs from "@/components/FAQs";
import { Metadata } from "next";

export const dynamic = 'force-static';
export const revalidate = false;

export const metadata: Metadata = {
  title: "Häufig Gestellte Fragen | Sport Endorse",
  description: "Finden Sie Antworten auf häufige Fragen zur Athleten-Sponsoring-Plattform von Sport Endorse. Erfahren Sie über Preise, Zahlungsbedingungen und wie Sie sich mit Elite-Athleten verbinden.",
  alternates: {
    canonical: "https://www.sportendorse.com/de/faqs",
    languages: {
      'en-gb': 'https://www.sportendorse.com/faqs',
      'es-es': 'https://www.sportendorse.com/es/faqs',
      'de-de': 'https://www.sportendorse.com/de/faqs',
      'fr-fr': 'https://www.sportendorse.com/fr/faqs',
      'x-default': 'https://www.sportendorse.com/faqs'
    }
  },
  openGraph: {
    title: "Häufig gestellte Fragen | Sport Endorse",
    description: "Finden Sie Antworten auf häufige Fragen zur Athleten-Sponsoring-Plattform von Sport Endorse. Erfahren Sie mehr über Preise, Zahlungsbedingungen und wie Sie sich mit Elite-Athleten verbinden können.",
    type: "website",
    locale: "de_DE",
    url: "https://www.sportendorse.com/de/faqs",
    siteName: "Sport Endorse",
    alternateLocale: ['en_US', 'es_ES', 'fr_FR'],
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

export default function FAQsPage() {
  return (
    <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem 1rem" }}>
      <FAQs />

      <CalendlyDemo />
    </main>
  );
}