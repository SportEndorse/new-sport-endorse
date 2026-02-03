import { Metadata } from 'next'
import SuccessStoriesContent from '@/components/SuccessStoriesContent'

export const metadata: Metadata = {
  title: "Sport-Marketing-Fallstudien & Marken-Erfolgsgeschichten",
  description: "Erkunden Sie Erfolgsgeschichten von Athleten-Sponsorings, Sport-Influencern und Markenpartnerschaften, die echte Marketing-Ergebnisse durch Sport Endorse erzielt haben.",
  alternates: {
    canonical: "https://www.sportendorse.com/de/success_stories",
    languages: {
      'en': '/success_stories',
      'es': '/es/success_stories',
      'de': '/de/success_stories',
      'fr': '/fr/success_stories'
    }
  },
  openGraph: {
    title: "Sport-Marketing-Fallstudien & Marken-Erfolgsgeschichten",
    description: "Erkunden Sie Erfolgsgeschichten von Athleten-Sponsorings, Sport-Influencern und Markenpartnerschaften, die echte Marketing-Ergebnisse durch Sport Endorse erzielt haben.",
    type: "website",
    locale: "de_DE",
    siteName: "Sport Endorse"
  }
}

export default function SuccessStoriesPage() {
  return <SuccessStoriesContent />
}