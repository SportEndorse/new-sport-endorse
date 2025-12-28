import LandingPageContent from "@/components/LandingPageContent";
import translations from "@/utils/translations";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Find and Sponsor Athletes for Your Brand Marketing",
  description: "Discover athlete brand ambassadors for your marketing campaigns. Connect with top talent at Sport Endorse & manage athlete sponsorships for enhanced visibility",
  
  
};

export default function BrandsPage() {
  const t = translations.en.brands;
  
  return (
    <LandingPageContent 
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
