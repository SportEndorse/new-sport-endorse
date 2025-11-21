import { Metadata } from 'next'
import SuccessStoriesContent from '@/components/SuccessStoriesContent'

export const metadata: Metadata = {
  title: "Sport-Marketing-Fallstudien & Marken-Erfolgsgeschichten",
  description: "Erkunden Sie Erfolgsgeschichten von Athleten-Sponsorings, Sport-Influencern und Markenpartnerschaften, die echte Marketing-Ergebnisse durch Sport Endorse erzielt haben.",
  alternates: {
    canonical: "https://www.sportendorse.com/de/success-stories",
    languages: {
      'en': '/success-stories',
      'es': '/es/success-stories',
      'de': '/de/success-stories'
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