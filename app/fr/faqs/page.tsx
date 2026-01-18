import CalendlyDemo from "@/components/CalendlyDemo";
import FAQs from "@/components/FAQs";
import { Metadata } from "next";

export const dynamic = 'force-static';
export const revalidate = false;

export const metadata: Metadata = {
  title: "Questions Fréquemment Posées | Sport Endorse",
  description: "Trouvez des réponses aux questions courantes sur la plateforme de parrainage d'athlètes de Sport Endorse. Découvrez les tarifs, les conditions de paiement et comment se connecter avec des athlètes d'élite.",
  alternates: {
    canonical: "https://www.sportendorse.com/fr/faqs",
    languages: {
      'en-gb': 'https://www.sportendorse.com/faqs',
      'es-es': 'https://www.sportendorse.com/es/faqs',
      'de-de': 'https://www.sportendorse.com/de/faqs',
      'fr-fr': 'https://www.sportendorse.com/fr/faqs',
      'x-default': 'https://www.sportendorse.com/faqs'
    }
  },
  openGraph: {
    title: "Questions Fréquemment Posées | Sport Endorse",
    description: "Trouvez des réponses aux questions courantes sur la plateforme de parrainage d'athlètes de Sport Endorse. Découvrez les tarifs, les conditions de paiement et comment se connecter avec des athlètes d'élite.",
    type: "website",
    locale: "fr_FR",
    url: "https://www.sportendorse.com/fr/faqs",
    siteName: "Sport Endorse",
    alternateLocale: ['en_US', 'es_ES', 'de_DE'],
    images: [
      {
        url: "https://www.sportendorse.com/images/sportEndorseLogo-min.png",
        width: 1200,
        height: 630,
        alt: "Logo Sport Endorse",
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