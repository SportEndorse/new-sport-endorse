import AboutUsContent from "../../../components/AboutUsContent";
import { Metadata } from "next";

export const dynamic = 'force-static';
export const revalidate = false;

export const metadata: Metadata = {
  title: "Acerca de Sport Endorse | Conectando Atletas con Marcas Mundialmente",
  description: "Conoce la misión de Sport Endorse de conectar atletas de élite con marcas premium a través de asociaciones auténticas y tecnología innovadora.",
  alternates: {
    canonical: "https://www.sportendorse.com/es/about-us",
    languages: {
      'en-gb': 'https://www.sportendorse.com/about-us',
      'es-es': 'https://www.sportendorse.com/es/about-us',
      'de-de': 'https://www.sportendorse.com/de/about-us',
      'x-default': 'https://www.sportendorse.com/about-us'
    }
  },
  openGraph: {
    title: "Acerca de Sport Endorse | Conectando Atletas con Marcas Mundialmente",
    description: "Conoce la misión de Sport Endorse de conectar atletas de élite con marcas premium a través de asociaciones auténticas y tecnología innovadora.",
    type: "website",
    locale: "es_ES",
    url: "https://www.sportendorse.com/es/about-us",
    siteName: "Sport Endorse",
    alternateLocale: ['en_US', 'de_DE']
  },
};

export default function AboutUsES() {
  return <AboutUsContent />;
}