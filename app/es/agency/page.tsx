import AgencyContent from "../../../components/AgencyContent";
import { Metadata } from "next";

export const dynamic = 'force-static';
export const revalidate = false;

export const metadata: Metadata = {
  title: "Agencias Deportivas - Haz Crecer tu Cartera de Atletas | Sport Endorse",
  description: "Impulsa el crecimiento de tu agencia deportiva con Sport Endorse. Conecta a tus atletas con marcas premium y genera ingresos adicionales a través de colaboraciones auténticas.",
  alternates: {
    canonical: "https://www.sportendorse.com/es/agency/",
    languages: {
      'en-gb': 'https://www.sportendorse.com/agency/',
      'es-es': 'https://www.sportendorse.com/es/agency/',
      'de-de': 'https://www.sportendorse.com/de/agency/',
      'x-default': 'https://www.sportendorse.com/agency/'
    }
  },
  openGraph: {
    title: "Agencias Deportivas - Haz Crecer tu Cartera de Atletas | Sport Endorse",
    description: "Impulsa el crecimiento de tu agencia deportiva con Sport Endorse. Conecta a tus atletas con marcas premium y genera ingresos adicionales a través de colaboraciones auténticas.",
    type: "website",
    locale: "es_ES",
    url: "https://www.sportendorse.com/es/agency/",
    siteName: "Sport Endorse",
    alternateLocale: ['en_US', 'de_DE']
  },
};

export default function AgencyPageES() {
  return <AgencyContent />;
}