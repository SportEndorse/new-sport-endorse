import { Metadata } from 'next'
import BlogContent from '@/components/BlogContent'

export const metadata: Metadata = {
  title: "Blog - Perspectives du marketing sportif et tendances du sponsoring",
  description: "Découvrez des histoires de parrainage d'athlètes, des conseils de marketing de marque et des insights d'influenceurs des experts de Sport Endorse. Apprenez à élever votre marketing sportif.",
  alternates: {
    canonical: "https://www.sportendorse.com/fr/blog",
    languages: {
      'en': '/blog',
      'es': '/es/blog',
      'de': '/de/blog',
      'fr': '/fr/blog'
    }
  },
  openGraph: {
    title: "Blog - Perspectives du marketing sportif et tendances du sponsoring",
    description: "Découvrez des histoires de parrainage d'athlètes, des conseils de marketing de marque et des insights d'influenceurs des experts de Sport Endorse. Apprenez à élever votre marketing sportif.",
    type: "website",
    locale: "fr_FR",
    url: "https://www.sportendorse.com/fr/blog",
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