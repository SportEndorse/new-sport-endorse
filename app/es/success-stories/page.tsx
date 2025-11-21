import { Metadata } from 'next'
import SuccessStoriesContent from '@/components/SuccessStoriesContent'

export const metadata: Metadata = {
  title: "Estudios de Caso de Marketing Deportivo e Historias de Éxito de Marcas",
  description: "Explora historias de éxito de patrocinios de atletas, influencers deportivos y asociaciones de marca que generaron resultados de marketing reales a través de Sport Endorse.",
  alternates: {
    canonical: "https://www.sportendorse.com/es/success-stories",
    languages: {
      'en': '/success-stories',
      'es': '/es/success-stories',
      'de': '/de/success-stories'
    }
  },
  openGraph: {
    title: "Estudios de Caso de Marketing Deportivo e Historias de Éxito de Marcas",
    description: "Explora historias de éxito de patrocinios de atletas, influencers deportivos y asociaciones de marca que generaron resultados de marketing reales a través de Sport Endorse.",
    type: "website",
    locale: "es_ES",
    siteName: "Sport Endorse"
  }
}

export default function SuccessStoriesPage() {
  return <SuccessStoriesContent />
}