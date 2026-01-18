import { Metadata } from 'next'
import ContactUsContent from '@/components/ContactUsContent'

export const dynamic = 'force-static';
export const revalidate = false;

export const metadata: Metadata = {
  title: 'Contactar Sport Endorse | Ponte en Contacto con Nuestro Equipo',
  description: 'Contacta Sport Endorse para aprender cómo nuestra plataforma de patrocinio deportivo conecta marcas con atletas de élite. Ponte en contacto con nuestro equipo para asociaciones y oportunidades.',
  alternates: {
    canonical: "https://www.sportendorse.com/es/contact-us",
    languages: {
      'en': '/contact-us',
      'es': '/es/contact-us',
      'de': '/de/contact-us'
    }
  },
  openGraph: {
    title: 'Contactar Sport Endorse | Ponte en Contacto con Nuestro Equipo',
    description: 'Contacta Sport Endorse para aprender cómo nuestra plataforma de patrocinio deportivo conecta marcas con atletas de élite. Ponte en contacto con nuestro equipo para asociaciones y oportunidades.',
    type: "website",
    locale: "es_ES",
    url: "https://www.sportendorse.com/es/contact-us",
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

export default function ContactUsPage() {
  return <ContactUsContent />
}