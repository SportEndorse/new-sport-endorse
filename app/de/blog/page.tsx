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
      'de': '/de/blog',
      'fr': '/fr/blog'
    }
  },
  openGraph: {
    title: "Blog - Sport-Marketing-Einblicke & Sponsoring-Trends",
    description: "Entdecken Sie Athleten-Sponsoring-Geschichten, Marken-Marketing-Tipps und Influencer-Einblicke von den Experten bei Sport Endorse. Lernen Sie, wie Sie im Sport-Marketing aufsteigen.",
    type: "website",
    locale: "de_DE",
    url: "https://www.sportendorse.com/de/blog",
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

export default function BlogPage() {
  return <BlogContent />
}