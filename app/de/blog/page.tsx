import { Metadata } from 'next'
import BlogContent from '@/components/BlogContent'

export const metadata: Metadata = {
  title: "Blog - Sport-Marketing-Einblicke & Sponsoring-Trends",
  description: "Entdecken Sie Athleten-Sponsoring-Geschichten, Marken-Marketing-Tipps und Influencer-Einblicke von den Experten bei Sport Endorse. Lernen Sie, wie Sie im Sport-Marketing aufsteigen.",
  alternates: {
    canonical: "https://www.sportendorse.com/de/blog",
    languages: {
      'en': '/blog',
      'es': '/es/blog',
      'de': '/de/blog'
    }
  },
  openGraph: {
    title: "Blog - Sport-Marketing-Einblicke & Sponsoring-Trends",
    description: "Entdecken Sie Athleten-Sponsoring-Geschichten, Marken-Marketing-Tipps und Influencer-Einblicke von den Experten bei Sport Endorse. Lernen Sie, wie Sie im Sport-Marketing aufsteigen.",
    type: "website",
    locale: "de_DE",
    siteName: "Sport Endorse"
  }
}

export default function BlogPage() {
  return <BlogContent />
}