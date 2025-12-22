import AgencyContent from "../../../components/AgencyContent";
import { Metadata } from "next";

export const dynamic = 'force-static';
export const revalidate = false;

export const metadata: Metadata = {
  title: "Plataforma de Agentes Deportivos para Patrocinios de Atletas | Sport Endorse",
  description: "La plataforma de gestión de endorsements de Sport Endorse ayuda a los agentes deportivos a gestionar patrocinios de atletas y acuerdos de endorsement con herramientas de comunicación segura y cumplimiento.",
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
    title: "Plataforma de Agentes Deportivos para Patrocinios de Atletas | Sport Endorse",
    description: "La plataforma de gestión de endorsements de Sport Endorse ayuda a los agentes deportivos a gestionar patrocinios de atletas y acuerdos de endorsement con herramientas de comunicación segura y cumplimiento.",
    type: "website",
    locale: "es_ES",
    url: "https://www.sportendorse.com/es/agency/",
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

export default function AgencyPageES() {
  return <AgencyContent />;
}