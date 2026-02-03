import BrandsContent from "@/components/BrandsContent";
import translations from "@/utils/translations";
import { Metadata } from "next";

export const dynamic = 'force-static';
export const revalidate = false;

export const metadata: Metadata = {
  title: "Trouvez des athlètes d'élite et des influenceurs sportifs pour votre marque | Sport Endorse",
  description: "Découvrez des athlètes d'élite et des influenceurs sportifs pour améliorer la visibilité de votre marque. Sport Endorse vous aide à gérer les parrainages d'athlètes et les campagnes de marketing sportif.",
  alternates: {
    canonical: "https://www.sportendorse.com/fr/brands",
    languages: {
      'en-gb': 'https://www.sportendorse.com/brands',
      'es-es': 'https://www.sportendorse.com/es/brands',
      'de-de': 'https://www.sportendorse.com/de/brands',
      'fr-fr': 'https://www.sportendorse.com/fr/brands',
      'x-default': 'https://www.sportendorse.com/brands'
    }
  },
  openGraph: {
    title: "Trouvez des athlètes d'élite et des influenceurs sportifs pour votre marque | Sport Endorse",
    description: "Découvrez des athlètes d'élite et des influenceurs sportifs pour améliorer la visibilité de votre marque. Sport Endorse vous aide à gérer les parrainages d'athlètes et les campagnes de marketing sportif.",
    type: "website",
    locale: "fr_FR",
    url: "https://www.sportendorse.com/fr/brands",
    siteName: "Sport Endorse",
    alternateLocale: ['en_US', 'es_ES', 'de_DE'],
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

export default function BrandsPageFrench() {
  const t = translations.fr.brands;
  
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