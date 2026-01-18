import HomeContent from "../../components/HomeContent";
import { Metadata } from "next";

export const dynamic = 'force-static';
export const revalidate = false;

export const metadata: Metadata = {
  title: "Plateforme de parrainage sportif pour les marques et les athlètes",
  description: "Sport Endorse est une plateforme de parrainage sportif où les marques et les athlètes se connectent, collaborent et gèrent des partenariats de marketing sportif authentiques.",
  alternates: {
    canonical: "https://www.sportendorse.com/fr/",
    languages: {
      'en-gb': 'https://www.sportendorse.com/',
      'es-es': 'https://www.sportendorse.com/es/',
      'de-de': 'https://www.sportendorse.com/de/',
      'fr-fr': 'https://www.sportendorse.com/fr/',
      'x-default': 'https://www.sportendorse.com/'
    }
  },
  openGraph: {
    title: "Plateforme de parrainage sportif pour les marques et les athlètes",
    description: "Sport Endorse est une plateforme de parrainage sportif où les marques et les athlètes se connectent, collaborent et gèrent des partenariats de marketing sportif authentiques.",
    type: "website",
    locale: "fr_FR",
    url: "https://www.sportendorse.com/fr/",
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

export default function HomePageFR() {
  return <HomeContent />;
}