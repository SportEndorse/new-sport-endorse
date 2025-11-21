import { Metadata } from 'next'
import NewsContent from '@/components/NewsContent'

export const metadata: Metadata = {
  title: "Latest Sports News & Press Releases | Sport Endorse",
  description: "Stay updated with the latest news and press releases from Sport Endorse, covering athlete sponsorships, sports marketing, and brand partnerships.",
  alternates: {
    canonical: "https://www.sportendorse.com/presses",
    languages: {
      'en': '/presses',
      'es': '/es/presses',
      'de': '/de/presses'
    }
  },
  openGraph: {
    title: "Latest Sports News & Press Releases | Sport Endorse",
    description: "Stay updated with the latest news and press releases from Sport Endorse, covering athlete sponsorships, sports marketing, and brand partnerships.",
    type: "website",
    locale: "en_US",
    siteName: "Sport Endorse"
  }
}

export default function NewsPage() {
  return <NewsContent />
}