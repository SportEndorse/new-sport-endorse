import { Metadata } from 'next'
import ContactUsContent from '@/components/ContactUsContent'

export const dynamic = 'force-static';
export const revalidate = false;

export const metadata: Metadata = {
  title: 'Contact Sport Endorse | Get in Touch with Our Team',
  description: 'Contact Sport Endorse to learn how our sports sponsorship platform connects brands with elite athletes. Get in touch with our team for partnerships and opportunities.',
  alternates: {
    canonical: "https://www.sportendorse.com/contact-us",
    languages: {
      'en': '/contact-us',
      'es': '/es/contact-us',
      'de': '/de/contact-us'
    }
  },
  openGraph: {
    title: 'Contact Sport Endorse | Get in Touch with Our Team',
    description: 'Contact Sport Endorse to learn how our sports sponsorship platform connects brands with elite athletes. Get in touch with our team for partnerships and opportunities.',
    type: "website",
    locale: "en_US",
    siteName: "Sport Endorse"
  }
}

export default function ContactUsPage() {
  return <ContactUsContent />
}