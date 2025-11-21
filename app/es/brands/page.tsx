import BrandsContent from "@/components/BrandsContent";
import translations from "@/utils/translations";
import { Metadata } from "next";

export const dynamic = 'force-static';
export const revalidate = false;

export const metadata: Metadata = {
  title: "Encuentra y Patrocina Atletas para el Marketing de tu Marca",
  description: "Descubre embajadores de marca atléticos para tus campañas de marketing. Conecta con el mejor talento en Sport Endorse y gestiona patrocinios de atletas para mayor visibilidad",
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
    title: "Encuentra y Patrocina Atletas para el Marketing de tu Marca",
    description: "Descubre embajadores de marca atléticos para tus campañas de marketing. Conecta con el mejor talento en Sport Endorse y gestiona patrocinios de atletas para mayor visibilidad",
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