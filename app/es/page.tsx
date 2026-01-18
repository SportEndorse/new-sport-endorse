import HomeContent from "../../components/HomeContent";
import { Metadata } from "next";

export const dynamic = 'force-static';
export const revalidate = false;

export const metadata: Metadata = {
  title: "Plataforma de Patrocinio Deportivo para Asociaciones de Marca y Atletas",
  description: "Sport Endorse es una plataforma de patrocinio deportivo donde marcas y atletas se conectan, colaboran y gestionan asociaciones auténticas de marketing deportivo.",
  alternates: {
    canonical: "https://www.sportendorse.com/es/",
    languages: {
      'en-gb': 'https://www.sportendorse.com/',
      'es-es': 'https://www.sportendorse.com/es/',
      'de-de': 'https://www.sportendorse.com/de/',
      'fr-fr': 'https://www.sportendorse.com/fr/',
      'x-default': 'https://www.sportendorse.com/'
    }
  },
  openGraph: {
    title: "Plataforma de Patrocinio Deportivo para Asociaciones de Marca y Atletas",
    description: "Sport Endorse es una plataforma de patrocinio deportivo donde marcas y atletas se conectan, colaboran y gestionan asociaciones auténticas de marketing deportivo.",
    type: "website",
    locale: "es_ES",
    url: "https://www.sportendorse.com/es/",
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

export default function HomePageES() {
  return <HomeContent />;
}