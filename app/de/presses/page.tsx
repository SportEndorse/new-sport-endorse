import { Metadata } from 'next'
import NewsContent from '@/components/NewsContent'

export const metadata: Metadata = {
  title: "Neueste Sport-Nachrichten & Pressemitteilungen | Sport Endorse",
  description: "Bleiben Sie auf dem Laufenden mit den neuesten Nachrichten und Pressemitteilungen von Sport Endorse, die Athleten-Sponsorings, Sport-Marketing und Markenpartnerschaften abdecken.",
  alternates: {
    canonical: "https://www.sportendorse.com/de/presses",
    languages: {
      'en': '/presses',
      'es': '/es/presses',
      'de': '/de/presses',
      'fr': '/fr/presses'
    }
  },
  openGraph: {
    title: "Neueste Sport-Nachrichten & Pressemitteilungen | Sport Endorse",
    description: "Bleiben Sie auf dem Laufenden mit den neuesten Nachrichten und Pressemitteilungen von Sport Endorse, die Athleten-Sponsorings, Sport-Marketing und Markenpartnerschaften abdecken.",
    type: "website",
    locale: "de_DE",
    url: "https://www.sportendorse.com/de/presses",
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