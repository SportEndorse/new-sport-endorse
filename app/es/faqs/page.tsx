import CalendlyDemo from "@/components/CalendlyDemo";
import FAQs from "@/components/FAQs";
import { Metadata } from "next";

export const dynamic = 'force-static';
export const revalidate = false;

export const metadata: Metadata = {
  title: "Preguntas Frecuentes | Sport Endorse",
  description: "Encuentra respuestas a preguntas comunes sobre la plataforma de patrocinio de atletas de Sport Endorse. Aprende sobre precios, términos de pago y cómo conectar con atletas de élite.",
  alternates: {
    canonical: "https://www.sportendorse.com/es/faqs",
    languages: {
      'en-gb': 'https://www.sportendorse.com/faqs',
      'es-es': 'https://www.sportendorse.com/es/faqs',
      'de-de': 'https://www.sportendorse.com/de/faqs',
      'x-default': 'https://www.sportendorse.com/faqs'
    }
  },
  openGraph: {
    title: "Preguntas Frecuentes | Sport Endorse",
    description: "Encuentra respuestas a preguntas comunes sobre la plataforma de patrocinio de atletas de Sport Endorse. Aprende sobre precios, términos de pago y cómo conectar con atletas de élite.",
    type: "website",
    locale: "es_ES",
    url: "https://www.sportendorse.com/es/faqs",
    siteName: "Sport Endorse",
    alternateLocale: ['en_US', 'de_DE'],
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