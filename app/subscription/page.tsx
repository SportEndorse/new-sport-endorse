import BusinessSubscription from "@/components/BusinessSubscription";
import CalendlyDemo from "@/components/CalendlyDemo";
import SubscriptionFAQs from "@/components/SubscriptionFAQs";
import SuccessStories from "@/components/SuccessStories";
import { Metadata } from "next";

export const dynamic = 'force-static';
export const revalidate = false;

export const metadata: Metadata = {
  //metadataBase: new URL("put the home url here later"),
  title: "Subscribe to Sport Endorse's Athlete Sponsorship Platform",
  description: "Explore how Sport Endorse's platform simplifies sponsorship management. Request a FREE demo to connect with athletes, brand ambassadors, and sports influencers.",
  alternates: {
    canonical: "https://www.sportendorse.com/subscription",
    languages: {
      'en': 'https://www.sportendorse.com/subscription',
      'es': 'https://www.sportendorse.com/es/subscription',
      'de': 'https://www.sportendorse.com/de/subscription',
      'x-default': 'https://www.sportendorse.com/subscription'
    }
  },
  openGraph:{ // og:title and so on
    title: "Subscribe to Sport Endorse's Athlete Sponsorship Platform",
    description: "Explore how Sport Endorse's platform simplifies sponsorship management. Request a FREE demo to connect with athletes, brand ambassadors, and sports influencers.",
    type:"website",
    locale:"en_US",
    url: "https://www.sportendorse.com/subscription",
    siteName:"Sport Endorse"
  },
};


export default function Subscription(){
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