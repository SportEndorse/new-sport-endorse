import BusinessSubscription from "@/components/BusinessSubscription";
import CalendlyDemo from "@/components/CalendlyDemo";
import SubscriptionFAQs from "@/components/SubscriptionFAQs";
import SuccessStories from "@/components/SuccessStories";
import { Metadata } from "next";

export const dynamic = 'force-static';
export const revalidate = false;

export const metadata: Metadata = {
  //metadataBase: new URL("put the home url here later"),
  title: "Abonnez-vous à la plateforme de parrainage d'athlètes de Sport Endorse",
  description: "Découvrez comment la plateforme de Sport Endorse simplifie la gestion des parrainages. Demandez une démo GRATUITE pour vous connecter avec des athlètes, des ambassadeurs de marque et des influenceurs sportifs.",
  alternates: {
    canonical: "https://www.sportendorse.com/fr/subscription",
    languages: {
      'en': 'https://www.sportendorse.com/subscription',
      'es': 'https://www.sportendorse.com/es/subscription',
      'de': 'https://www.sportendorse.com/de/subscription',
      'fr': 'https://www.sportendorse.com/fr/subscription',
      'x-default': 'https://www.sportendorse.com/subscription'
    }
  },
  openGraph: {
    title: "Abonnez-vous à la plateforme de parrainage d'athlètes de Sport Endorse",
    description: "Découvrez comment la plateforme de Sport Endorse simplifie la gestion des parrainages. Demandez une démo GRATUITE pour vous connecter avec des athlètes, des ambassadeurs de marque et des influenceurs sportifs.",
    type: "website",
    locale: "fr_FR",
    url: "https://www.sportendorse.com/fr/subscription",
    siteName: "Sport Endorse",
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


export default function SubscriptionFR(){
    return (
        <main style={{maxWidth:"1200px", margin:"0 auto"}}>
            <br/>
            <BusinessSubscription titleLevel="h1" />

            <CalendlyDemo />

            <SuccessStories />

            <SubscriptionFAQs />
        
        </main>
    );
    
}