import HomeContent from "../../components/HomeContent";
import { Metadata } from "next";

export const dynamic = 'force-static';
export const revalidate = false;

export const metadata: Metadata = {
  title: "Sport Endorse | Conecta Marcas con Atletas de Élite e Influencers Deportivos",
  description: "Sport Endorse es la plataforma que une marcas y atletas para asociaciones auténticas e impactantes. Facilitamos que las marcas encuentren y colaboren con el talento adecuado, y que los atletas se conecten directamente con marcas y aseguren acuerdos pagados.",
  alternates: {
    canonical: "https://www.sportendorse.com/es/",
    languages: {
      'en-gb': 'https://www.sportendorse.com/',
      'es-es': 'https://www.sportendorse.com/es/',
      'de-de': 'https://www.sportendorse.com/de/',
      'x-default': 'https://www.sportendorse.com/'
    }
  },
  openGraph: {
    title: "Sport Endorse | Conecta Marcas con Atletas de Élite e Influencers Deportivos",
    description: "Sport Endorse es la plataforma que une marcas y atletas para asociaciones auténticas e impactantes. Facilitamos que las marcas encuentren y colaboren con el talento adecuado, y que los atletas se conecten directamente con marcas y aseguren acuerdos pagados.",
    type: "website",
    locale: "es_ES",
    url: "https://www.sportendorse.com/es/",
    siteName: "Sport Endorse",
    alternateLocale: ['en_US', 'de_DE']
  },
};

export default function HomePageES() {
  return <HomeContent />;
}