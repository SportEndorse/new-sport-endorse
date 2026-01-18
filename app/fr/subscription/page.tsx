import BusinessSubscription from "@/components/BusinessSubscription";
import CalendlyDemo from "@/components/CalendlyDemo";
import SubscriptionFAQs from "@/components/SubscriptionFAQs";
import SuccessStories from "@/components/SuccessStories";
import { Metadata } from "next";

export const dynamic = 'force-static';
export const revalidate = false;

export const metadata: Metadata = {
  //metadataBase: new URL("put the home url here later"),
  title: "Suscríbete a la Plataforma de Patrocinio de Atletas de Sport Endorse",
  description: "Explora cómo la plataforma de Sport Endorse simplifica la gestión de patrocinios. Solicita una demostración GRATUITA para conectar con atletas, embajadores de marca e influencers deportivos.",
  alternates: {
    canonical: "https://www.sportendorse.com/es/subscription",
    languages: {
      'en': 'https://www.sportendorse.com/subscription',
      'es': 'https://www.sportendorse.com/es/subscription',
      'de': 'https://www.sportendorse.com/de/subscription',
      'x-default': 'https://www.sportendorse.com/subscription'
    }
  },
  openGraph: {
    title: "Suscríbete a la Plataforma de Patrocinio de Atletas de Sport Endorse",
    description: "Explora cómo la plataforma de Sport Endorse simplifica la gestión de patrocinios. Solicita una demostración GRATUITA para conectar con atletas, embajadores de marca e influencers deportivos.",
    type: "website",
    locale: "es_ES",
    url: "https://www.sportendorse.com/es/subscription",
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


export default function SubscriptionES(){
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