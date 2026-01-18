import TalentContent from "../../../components/TalentContent";
import { Metadata } from "next";

export const dynamic = 'force-static';
export const revalidate = false;

export const metadata: Metadata = {
  title: "Únete a Nuestro Mercado de Atletas y Solicita Patrocinios",
  description: "Regístrate en Sport Endorse para conectar con marcas, encontrar oportunidades de patrocinio de atletas, solicitar acuerdos, conseguir patrocinios y hacer crecer tu influencia en la industria.",
  alternates: {
    canonical: "https://www.sportendorse.com/es/talent/",
    languages: {
      'en-gb': 'https://www.sportendorse.com/talent/',
      'es-es': 'https://www.sportendorse.com/es/talent/',
      'de-de': 'https://www.sportendorse.com/de/talent/',
      'x-default': 'https://www.sportendorse.com/talent/'
    }
  },
  openGraph: {
    title: "Únete a Nuestro Mercado de Atletas y Solicita Patrocinios",
    description: "Regístrate en Sport Endorse para conectar con marcas, encontrar oportunidades de patrocinio de atletas, solicitar acuerdos, conseguir patrocinios y hacer crecer tu influencia en la industria.",
    type: "website",
    locale: "es_ES",
    url: "https://www.sportendorse.com/es/talent/",
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

export default function TalentPageES() {
  return <TalentContent />;
}