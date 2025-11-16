import BrandsContent from "@/components/BrandsContent";
import translations from "@/utils/translations";
import { Metadata } from "next";

export const dynamic = 'force-static';
export const revalidate = false;

export const metadata: Metadata = {
  title: "Encuentra Atletas de Élite e Influencers Deportivos para tu Marca | Sport Endorse",
  description: "Descubre atletas de élite e influencers deportivos para mejorar la visibilidad de tu marca. Sport Endorse te ayuda a gestionar patrocinios de atletas y campañas de marketing deportivo.",
  alternates: {
    canonical: "https://www.sportendorse.com/es/brands",
    languages: {
      'en-gb': 'https://www.sportendorse.com/brands',
      'es-es': 'https://www.sportendorse.com/es/brands',
      'de-de': 'https://www.sportendorse.com/de/brands',
      'x-default': 'https://www.sportendorse.com/brands'
    }
  },
  openGraph: {
    title: "Encuentra Atletas de Élite e Influencers Deportivos para tu Marca | Sport Endorse",
    description: "Descubre atletas de élite e influencers deportivos para mejorar la visibilidad de tu marca. Sport Endorse te ayuda a gestionar patrocinios de atletas y campañas de marketing deportivo.",
    type: "website",
    locale: "es_ES",
    url: "https://www.sportendorse.com/es/brands",
    siteName: "Sport Endorse",
    alternateLocale: ['en_US', 'de_DE']
  },
};

export default function BrandsPageSpanish() {
  const t = translations.es.brands;
  
  return (
    <BrandsContent 
      badge={t.badge}
      title={t.title}
      description={t.description}
      featuredAthletes={t.featuredAthletes}
      viewAll={t.viewAll}
    />
  );
}