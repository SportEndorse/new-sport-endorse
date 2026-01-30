import { Metadata } from 'next'
import ContactUsContent from '@/components/ContactUsContent'

export const dynamic = 'force-static';
export const revalidate = false;

export const metadata: Metadata = {
  title: 'Contacter Sport Endorse | Contactez notre équipe',
  description: 'Contactez Sport Endorse pour découvrir comment notre plateforme de parrainage sportif connecte les marques avec des athlètes d’élite. Contactez notre équipe pour des partenariats et des opportunités.',
  alternates: {
    canonical: "https://www.sportendorse.com/fr/contact-us",
    languages: {
      'en': '/contact-us',
      'es': '/es/contact-us',
      'de': '/de/contact-us',
      'fr': '/fr/contact-us'
    }
  },
  openGraph: {
    title: 'Contacter Sport Endorse | Contactez notre équipe',
    description: 'Contactez Sport Endorse pour découvrir comment notre plateforme de parrainage sportif connecte les marques avec des athlètes d’élite. Contactez notre équipe pour des partenariats et des opportunités.',
    type: "website",
    locale: "fr_FR",
    url: "https://www.sportendorse.com/fr/contact-us",
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