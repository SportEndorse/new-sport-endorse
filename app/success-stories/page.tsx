import { Metadata } from 'next'
import SuccessStoriesContent from '@/components/SuccessStoriesContent'

export const metadata: Metadata = {
  title: "Sports Marketing Case Studies & Brand Success Stories",
  description: "Explore success stories of athlete sponsorships, sports influencers, and brand partnerships that powered real marketing results through Sport Endorse.",
  alternates: {
    canonical: "https://www.sportendorse.com/success-stories",
    languages: {
      'en': '/success-stories',
      'es': '/es/success-stories',
      'de': '/de/success-stories'
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