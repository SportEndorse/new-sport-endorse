import { Metadata } from 'next'
import ContactUsContent from '@/components/ContactUsContent'

export const dynamic = 'force-static';
export const revalidate = false;

export const metadata: Metadata = {
  title: 'Sport Endorse Kontaktieren | Treten Sie mit Unserem Team in Kontakt',
  description: 'Kontaktieren Sie Sport Endorse, um zu erfahren, wie unsere Sport-Sponsoring-Plattform Marken mit Elite-Athleten verbindet. Treten Sie mit unserem Team für Partnerschaften und Möglichkeiten in Kontakt.',
  alternates: {
    canonical: "https://www.sportendorse.com/de/contact-us",
    languages: {
      'en': '/contact-us',
      'es': '/es/contact-us',
      'de': '/de/contact-us',
      'fr': '/fr/contact-us'
    }
  },
  openGraph: {
    title: 'Sport Endorse Kontaktieren | Treten Sie mit Unserem Team in Kontakt',
    description: 'Kontaktieren Sie Sport Endorse, um zu erfahren, wie unsere Sport-Sponsoring-Plattform Marken mit Elite-Athleten verbindet. Treten Sie mit unserem Team für Partnerschaften und Möglichkeiten in Kontakt.',
    type: "website",
    locale: "de_DE",
    url: "https://www.sportendorse.com/de/contact-us",
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