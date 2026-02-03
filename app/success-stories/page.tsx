import { Metadata } from 'next'
import SuccessStoriesContent from '@/components/SuccessStoriesContent'

export const metadata: Metadata = {
  title: "Sports Marketing Case Studies & Brand Success Stories",
  description: "Explore success stories of athlete sponsorships, sports influencers, and brand partnerships that powered real marketing results through Sport Endorse.",
  alternates: {
    canonical: "https://www.sportendorse.com/success_stories",
    languages: {
      'en': '/success_stories',
      'es': '/es/success_stories',
      'de': '/de/success_stories',
      'fr': '/fr/success_stories'
    }
  },
  openGraph: {
    title: "Sports Marketing Case Studies & Brand Success Stories",
    description: "Explore success stories of athlete sponsorships, sports influencers, and brand partnerships that powered real marketing results through Sport Endorse.",
    type: "website",
    locale: "en_US",
    url: "https://www.sportendorse.com/success-stories",
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

export default function SuccessStoriesPage() {
  return <SuccessStoriesContent />
}