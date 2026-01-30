import { Metadata } from 'next'
import PodcastsContent from '@/components/PodcastsContent'

export const metadata: Metadata = {
  title: "Sports Marketing Podcasts & Expert Insights | Sport Endorse",
  description: "Listen to expert discussions on sports marketing, athlete partnerships, and industry insights. Stay ahead with our sports sponsorship podcasts.",
  alternates: {
    canonical: "https://www.sportendorse.com/podcasts",
    languages: {
      'en': '/podcasts',
      'es': '/es/podcasts',
      'de': '/de/podcasts',
      'fr': '/fr/podcasts'
    }
  },
  openGraph: {
    title: "Sports Marketing Podcasts & Expert Insights | Sport Endorse",
    description: "Listen to expert discussions on sports marketing, athlete partnerships, and industry insights. Stay ahead with our sports sponsorship podcasts.",
    type: "website",
    locale: "en_US",
    url: "https://www.sportendorse.com/podcasts",
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