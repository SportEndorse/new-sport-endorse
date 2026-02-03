import { Metadata } from 'next'
import PodcastsContent from '@/components/PodcastsContent'

export const metadata: Metadata = {
  title: "Podcasts de Marketing Deportivo e Insights de Expertos | Sport Endorse",
  description: "Escucha discusiones de expertos sobre marketing deportivo, asociaciones de atletas e insights de la industria. Mantente al día con nuestros podcasts de patrocinio deportivo.",
  alternates: {
    canonical: "https://www.sportendorse.com/es/podcasts",
    languages: {
      'en': '/podcasts',
      'es': '/es/podcasts',
      'de': '/de/podcasts',
      'fr': '/fr/podcasts'
    }
  },
  openGraph: {
    title: "Podcasts de Marketing Deportivo e Insights de Expertos | Sport Endorse",
    description: "Escucha discusiones de expertos sobre marketing deportivo, asociaciones de atletas e insights de la industria. Mantente al día con nuestros podcasts de patrocinio deportivo.",
    type: "website",
    locale: "es_ES",
    url: "https://www.sportendorse.com/es/podcasts",
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