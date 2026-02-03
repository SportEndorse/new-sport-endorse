import { Metadata } from 'next'
import BlogContent from '@/components/BlogContent'

export const metadata: Metadata = {
  title: "Blog - Perspectivas de Marketing Deportivo y Tendencias de Patrocinio",
  description: "Descubre historias de patrocinio de atletas, consejos de marketing de marca e ideas de influencers de los expertos en Sport Endorse. Aprende cómo elevar tu marketing deportivo.",
  alternates: {
    canonical: "https://www.sportendorse.com/es/blog",
    languages: {
      'en': '/blog',
      'es': '/es/blog',
      'de': '/de/blog',
      'fr': '/fr/blog'
    }
  },
  openGraph: {
    title: "Blog - Perspectivas de Marketing Deportivo y Tendencias de Patrocinio",
    description: "Descubre historias de patrocinio de atletas, consejos de marketing de marca e ideas de influencers de los expertos en Sport Endorse. Aprende cómo elevar tu marketing deportivo.",
    type: "website",
    locale: "es_ES",
    url: "https://www.sportendorse.com/es/blog",
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