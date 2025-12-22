import AboutUsContent from "../../../components/AboutUsContent";
import { Metadata } from "next";

export const dynamic = 'force-static';
export const revalidate = false;

export const metadata: Metadata = {
  title: "Acerca de Sport Endorse - Plataforma Global de Marketing Deportivo",
  description: "Sport Endorse es una plataforma global de marketing deportivo que apoya la industria deportiva mundial a través de un equipo diverso de expertos que une marcas y atletas.",
  alternates: {
    canonical: "https://www.sportendorse.com/es/about-us",
    languages: {
      'en-gb': 'https://www.sportendorse.com/about-us',
      'es-es': 'https://www.sportendorse.com/es/about-us',
      'de-de': 'https://www.sportendorse.com/de/about-us',
      'x-default': 'https://www.sportendorse.com/about-us'
    }
  },
  openGraph: {
    title: "Acerca de Sport Endorse - Plataforma Global de Marketing Deportivo",
    description: "Sport Endorse es una plataforma global de marketing deportivo que apoya la industria deportiva mundial a través de un equipo diverso de expertos que une marcas y atletas.",
    type: "website",
    locale: "es_ES",
    url: "https://www.sportendorse.com/es/about-us",
    siteName: "Sport Endorse",
    alternateLocale: ['en_US', 'de_DE'],
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

export default function AboutUsES() {
  return <AboutUsContent />;
}