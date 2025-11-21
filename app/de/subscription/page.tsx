import BusinessSubscription from "@/components/BusinessSubscription";
import CalendlyDemo from "@/components/CalendlyDemo";
import SubscriptionFAQs from "@/components/SubscriptionFAQs";
import SuccessStories from "@/components/SuccessStories";
import { Metadata } from "next";

export const dynamic = 'force-static';
export const revalidate = false;

export const metadata: Metadata = {
  //metadataBase: new URL("put the home url here later"),
  title: "Abonnieren Sie Sport Endorses Athleten-Sponsoring-Plattform | Sport Endorse",
  description: "Entdecken Sie, wie Sport Endorses Plattform das Sponsoring-Management vereinfacht. Fordern Sie eine Demo an, um sich mit Elite-Athleten, Markenbotschaftern und Sport-Influencern zu verbinden.",
  alternates: {
    canonical: "https://www.sportendorse.com/de/subscription",
    languages: {
      'en': 'https://www.sportendorse.com/subscription',
      'es': 'https://www.sportendorse.com/es/subscription',
      'de': 'https://www.sportendorse.com/de/subscription',
      'x-default': 'https://www.sportendorse.com/subscription'
    }
  },
  openGraph:{ // og:title and so on
    title: "Abonnieren Sie Sport Endorses Athleten-Sponsoring-Plattform | Sport Endorse",
    description: "Entdecken Sie, wie Sport Endorses Plattform das Sponsoring-Management vereinfacht. Fordern Sie eine Demo an, um sich mit Elite-Athleten, Markenbotschaftern und Sport-Influencern zu verbinden.",
    type:"website",
    locale:"de_DE",
    url: "https://www.sportendorse.com/de/subscription",
    siteName:"Sport Endorse"
  },
};


export default function SubscriptionDE(){
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