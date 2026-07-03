import BookADemoContent from "@/components/BookADemoContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reserva Una Demo",
  description: "Reserva Una Demo",
  alternates: {
    canonical: "https://www.sportendorse.com/es/book-a-demo",
    languages: {
      'en-gb': 'https://www.sportendorse.com/book-a-demo',
      'es-es': 'https://www.sportendorse.com/es/book-a-demo',
      'de-de': 'https://www.sportendorse.com/de/book-a-demo',
      'fr-fr': 'https://www.sportendorse.com/fr/book-a-demo',
      'x-default': 'https://www.sportendorse.com/book-a-demo'
    }
  },
  openGraph: {
    title: "Reserva Una Demo",
    description: "Reserva Una Demo",
    type: "website",
    locale: "es_ES",
    url: "https://www.sportendorse.com/es/book-a-demo",
    siteName: "Sport Endorse",
    alternateLocale: ['en_US', 'de_DE', 'fr_FR'],
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

export default function BookADemoPage() {
  return (
    <BookADemoContent />
  );
}

// Force static generation
export const dynamic = 'force-static';
export const revalidate = false;
