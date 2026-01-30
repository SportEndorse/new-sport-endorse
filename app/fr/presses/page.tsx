import { Metadata } from 'next'
import NewsContent from '@/components/NewsContent'

export const metadata: Metadata = {
  title: "Dernières actualités sportives et communiqués de presse | Sport Endorse",
  description: "Restez informé des dernières actualités et communiqués de presse de Sport Endorse, couvrant les parrainages d'athlètes, le marketing sportif et les partenariats de marque.",
  alternates: {
    canonical: "https://www.sportendorse.com/fr/presses",
    languages: {
      'en': '/presses',
      'es': '/es/presses',
      'de': '/de/presses',
      'fr': '/fr/presses'
    }
  },
  openGraph: {
    title: "Dernières actualités sportives et communiqués de presse | Sport Endorse",
    description: "Restez informé des dernières actualités et communiqués de presse de Sport Endorse, couvrant les parrainages d'athlètes, le marketing sportif et les partenariats de marque.",
    type: "website",
    locale: "fr_FR",
    url: "https://www.sportendorse.com/fr/presses",
    siteName: "Sport Endorse",
    images: [
      {
        url: "https://www.sportendorse.com/images/sportEndorseLogo-min.png",
        width: 1200,
        height: 630,
        alt: "Sport Endorse logo",
      },
    ],
  }
}

export default function NewsPage() {
  return <NewsContent />
}