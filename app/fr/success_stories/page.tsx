import { Metadata } from 'next'
import SuccessStoriesContent from '@/components/SuccessStoriesContent'

export const metadata: Metadata = {
  title: "Études de cas en marketing sportif et success stories de marques",
  description: "Explorez des success stories de parrainages d'athlètes, d'influenceurs sportifs et de partenariats de marque ayant généré de vrais résultats marketing avec Sport Endorse.",
  alternates: {
    canonical: "https://www.sportendorse.com/fr/success_stories",
    languages: {
      'en': '/success_stories',
      'es': '/es/success_stories',
      'de': '/de/success_stories',
      'fr': '/fr/success_stories'
    }
  },
  openGraph: {
    title: "Études de cas en marketing sportif et success stories de marques",
    description: "Explorez des success stories de parrainages d'athlètes, d'influenceurs sportifs et de partenariats de marque ayant généré de vrais résultats marketing avec Sport Endorse.",
    type: "website",
    locale: "fr_FR",
    url: "https://www.sportendorse.com/fr/success_stories",
    siteName: "Sport Endorse"
  }
}

export default function SuccessStoriesPage() {
  return <SuccessStoriesContent />
}