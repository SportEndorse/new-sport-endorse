import CalendlyDemo from "@/components/CalendlyDemo";
import FAQs from "@/components/FAQs";
import { Metadata } from "next";

export const dynamic = 'force-static';
export const revalidate = false;

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Sport Endorse",
  description: "Find answers to common questions about Sport Endorse's athlete sponsorship platform. Learn about pricing, payment terms, and how to connect with elite athletes.",
  alternates: {
    canonical: "https://www.sportendorse.com/faqs",
    languages: {
      'en-gb': 'https://www.sportendorse.com/faqs',
      'es-es': 'https://www.sportendorse.com/es/faqs',
      'de-de': 'https://www.sportendorse.com/de/faqs',
      'fr-fr': 'https://www.sportendorse.com/fr/faqs',
      'x-default': 'https://www.sportendorse.com/faqs'
    }
  },
  openGraph: {
    title: "Frequently Asked Questions | Sport Endorse",
    description: "Find answers to common questions about Sport Endorse's athlete sponsorship platform. Learn about pricing, payment terms, and how to connect with elite athletes.",
    type: "website",
    locale: "en_US",
    url: "https://www.sportendorse.com/faqs",
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

export default function FAQsPage() {
  return (
    <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem 1rem" }}>
      <FAQs />
      
      <CalendlyDemo />
    </main>
  );
}