import BrandsContent from "@/components/BrandsContent";
import translations from "@/utils/translations";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Find and Sponsor Athletes for Your Brand Marketing",
  description: "Discover athlete brand ambassadors for your marketing campaigns. Connect with top talent at Sport Endorse & manage athlete sponsorships for enhanced visibility",
  alternates: {
    canonical: "https://www.sportendorse.com/brands",
    languages: {
      'en-gb': 'https://www.sportendorse.com/brands',
      'es-es': 'https://www.sportendorse.com/es/brands',
      'de-de': 'https://www.sportendorse.com/de/brands',
      'x-default': 'https://www.sportendorse.com/brands'
    }
  },
  openGraph: {
    title: "Find and Sponsor Athletes for Your Brand Marketing",
    description: "Discover athlete brand ambassadors for your marketing campaigns. Connect with top talent at Sport Endorse & manage athlete sponsorships for enhanced visibility",
    type: "website",
    locale: "en_US",
    url: "https://www.sportendorse.com/brands",
    siteName: "Sport Endorse",
    alternateLocale: ['es_ES', 'de_DE']
  },
};

export default function BrandsPage() {
  const t = translations.en.brands;
  
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

// Force static generation
export const dynamic = 'force-static';
export const revalidate = false;
