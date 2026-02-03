import { Metadata } from 'next'
import PodcastsContent from '@/components/PodcastsContent'

export const metadata: Metadata = {
  title: "Podcasts de marketing sportif et insights d'experts | Sport Endorse",
  description: "Écoutez des discussions d'experts sur le marketing sportif, les partenariats d'athlètes et les tendances du secteur. Gardez une longueur d'avance avec nos podcasts de sponsoring sportif.",
  alternates: {
    canonical: "https://www.sportendorse.com/fr/podcasts",
    languages: {
      'en': '/podcasts',
      'es': '/es/podcasts',
      'de': '/de/podcasts',
      'fr': '/fr/podcasts'
    }
  },
  openGraph: {
    title: "Podcasts de marketing sportif et insights d'experts | Sport Endorse",
    description: "Écoutez des discussions d'experts sur le marketing sportif, les partenariats d'athlètes et les tendances du secteur. Gardez une longueur d'avance avec nos podcasts de sponsoring sportif.",
    type: "website",
    locale: "fr_FR",
    url: "https://www.sportendorse.com/fr/podcasts",
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

export default function PodcastsPage() {
  return <PodcastsContent />
}