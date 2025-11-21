import { Metadata } from 'next'
import NewsContent from '@/components/NewsContent'

export const metadata: Metadata = {
  title: "Últimas Noticias Deportivas y Comunicados de Prensa | Sport Endorse",
  description: "Mantente actualizado con las últimas noticias y comunicados de prensa de Sport Endorse, cubriendo patrocinios de atletas, marketing deportivo y asociaciones de marca.",
  alternates: {
    canonical: "https://www.sportendorse.com/es/presses",
    languages: {
      'en': '/presses',
      'es': '/es/presses',
      'de': '/de/presses'
    }
  },
  openGraph: {
    title: "Últimas Noticias Deportivas y Comunicados de Prensa | Sport Endorse",
    description: "Mantente actualizado con las últimas noticias y comunicados de prensa de Sport Endorse, cubriendo patrocinios de atletas, marketing deportivo y asociaciones de marca.",
    type: "website",
    locale: "es_ES",
    siteName: "Sport Endorse"
  }
}

export default function NewsPage() {
  return <NewsContent />
}