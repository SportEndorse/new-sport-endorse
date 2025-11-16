import TalentContent from "../../../components/TalentContent";
import { Metadata } from "next";

export const dynamic = 'force-static';
export const revalidate = false;

export const metadata: Metadata = {
  title: "Athleten & Sport-Influencer - Bezahlte Deals mit Marken erhalten | Sport Endorse",
  description: "Tritt Sport Endorse bei und verbinde dich mit Marken, die deinen Werten entsprechen. Kollaboriere authentisch, sichere bezahlte Deals und lass deine Sportkarriere wachsen.",
  alternates: {
    canonical: "https://www.sportendorse.com/de/talent/",
    languages: {
      'en-gb': 'https://www.sportendorse.com/talent/',
      'es-es': 'https://www.sportendorse.com/es/talent/',
      'de-de': 'https://www.sportendorse.com/de/talent/',
      'x-default': 'https://www.sportendorse.com/talent/'
    }
  },
  openGraph: {
    title: "Athleten & Sport-Influencer - Bezahlte Deals mit Marken erhalten | Sport Endorse",
    description: "Tritt Sport Endorse bei und verbinde dich mit Marken, die deinen Werten entsprechen. Kollaboriere authentisch, sichere bezahlte Deals und lass deine Sportkarriere wachsen.",
    type: "website",
    locale: "de_DE",
    url: "https://www.sportendorse.com/de/talent/",
    siteName: "Sport Endorse",
    alternateLocale: ['en_US', 'es_ES']
  },
};

export default function TalentPageDE() {
  return <TalentContent />;
}