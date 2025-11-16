import AgencyContent from "../../../components/AgencyContent";
import { Metadata } from "next";

export const dynamic = 'force-static';
export const revalidate = false;

export const metadata: Metadata = {
  title: "Sportagenturen - Lass dein Athletenportfolio wachsen | Sport Endorse",
  description: "Treibe das Wachstum deiner Sportagentur mit Sport Endorse voran. Verbinde deine Athleten mit Premium-Marken und generiere zusätzliche Einnahmen durch authentische Kollaborationen.",
  alternates: {
    canonical: "https://www.sportendorse.com/de/agency/",
    languages: {
      'en-gb': 'https://www.sportendorse.com/agency/',
      'es-es': 'https://www.sportendorse.com/es/agency/',
      'de-de': 'https://www.sportendorse.com/de/agency/',
      'x-default': 'https://www.sportendorse.com/agency/'
    }
  },
  openGraph: {
    title: "Sportagenturen - Lass dein Athletenportfolio wachsen | Sport Endorse",
    description: "Treibe das Wachstum deiner Sportagentur mit Sport Endorse voran. Verbinde deine Athleten mit Premium-Marken und generiere zusätzliche Einnahmen durch authentische Kollaborationen.",
    type: "website",
    locale: "de_DE",
    url: "https://www.sportendorse.com/de/agency/",
    siteName: "Sport Endorse",
    alternateLocale: ['en_US', 'es_ES']
  },
};

export default function AgencyPageDE() {
  return <AgencyContent />;
}