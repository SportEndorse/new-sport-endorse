import TalentContent from "../../../components/TalentContent";
import { Metadata } from "next";

export const dynamic = 'force-static';
export const revalidate = false;

export const metadata: Metadata = {
  title: "Atletas e Influencers Deportivos - Obtén Acuerdos Pagados con Marcas | Sport Endorse",
  description: "Únete a Sport Endorse y conecta con marcas que se alinean con tus valores. Colabora auténticamente, consigue acuerdos pagados y haz crecer tu carrera deportiva.",
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
    title: "Atletas e Influencers Deportivos - Obtén Acuerdos Pagados con Marcas | Sport Endorse",
    description: "Únete a Sport Endorse y conecta con marcas que se alinean con tus valores. Colabora auténticamente, consigue acuerdos pagados y haz crecer tu carrera deportiva.",
    type: "website",
    locale: "es_ES",
    url: "https://www.sportendorse.com/es/talent/",
    siteName: "Sport Endorse",
    alternateLocale: ['en_US', 'de_DE']
  },
};

export default function TalentPageES() {
  return <TalentContent />;
}