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
      'de': '/de/success_stories'
    }
  },
  openGraph: {
    title: "Sports Marketing Case Studies & Brand Success Stories",
    description: "Explore success stories of athlete sponsorships, sports influencers, and brand partnerships that powered real marketing results through Sport Endorse.",
    type: "website",
    locale: "en_US",
    siteName: "Sport Endorse"
  }
}

export default function SuccessStoriesPage() {
  return <SuccessStoriesContent />
}