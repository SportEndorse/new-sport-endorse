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
      'de': '/de/blog'
    }
  },
  openGraph: {
    title: "Blog - Perspectivas de Marketing Deportivo y Tendencias de Patrocinio",
    description: "Descubre historias de patrocinio de atletas, consejos de marketing de marca e ideas de influencers de los expertos en Sport Endorse. Aprende cómo elevar tu marketing deportivo.",
    type: "website",
    locale: "es_ES",
    siteName: "Sport Endorse"
  }
}

export default function BlogPage() {
  return <BlogContent />
}