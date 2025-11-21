import BrandsContent from "@/components/BrandsContent";
import translations from "@/utils/translations";
import { Metadata } from "next";

export const dynamic = 'force-static';
export const revalidate = false;

export const metadata: Metadata = {
  title: "Finden und Sponsern Sie Athleten für Ihr Marken-Marketing",
  description: "Entdecken Sie Athleten-Markenbotschafter für Ihre Marketing-Kampagnen. Verbinden Sie sich mit Top-Talenten bei Sport Endorse und verwalten Sie Athleten-Sponsorings für erhöhte Sichtbarkeit",
  alternates: {
    canonical: "https://www.sportendorse.com/de/brands",
    languages: {
      'en-gb': 'https://www.sportendorse.com/brands',
      'es-es': 'https://www.sportendorse.com/es/brands',
      'de-de': 'https://www.sportendorse.com/de/brands',
      'x-default': 'https://www.sportendorse.com/brands'
    }
  },
  openGraph: {
    title: "Finden und Sponsern Sie Athleten für Ihr Marken-Marketing",
    description: "Entdecken Sie Athleten-Markenbotschafter für Ihre Marketing-Kampagnen. Verbinden Sie sich mit Top-Talenten bei Sport Endorse und verwalten Sie Athleten-Sponsorings für erhöhte Sichtbarkeit",
    type: "website",
    locale: "de_DE",
    url: "https://www.sportendorse.com/de/brands",
    siteName: "Sport Endorse",
    alternateLocale: ['en_US', 'es_ES']
  },
};

export default function BrandsPageGerman() {
  const t = translations.de.brands;
  
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