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
      'de': '/de/presses'
    }
  },
  openGraph: {
    title: "Neueste Sport-Nachrichten & Pressemitteilungen | Sport Endorse",
    description: "Bleiben Sie auf dem Laufenden mit den neuesten Nachrichten und Pressemitteilungen von Sport Endorse, die Athleten-Sponsorings, Sport-Marketing und Markenpartnerschaften abdecken.",
    type: "website",
    locale: "de_DE",
    siteName: "Sport Endorse"
  }
}

export default function NewsPage() {
  return <NewsContent />
}