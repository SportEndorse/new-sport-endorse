import { Metadata } from 'next'
import BlogContent from '@/components/BlogContent'

export const metadata: Metadata = {
  title: "Blog - Sports Marketing Insights & Sponsorship Trends",
  description: "Discover athlete sponsorship stories, brand marketing tips, and influencer insights from the experts at Sport Endorse. Learn how to elevate in sports marketing.",
  alternates: {
    canonical: "https://www.sportendorse.com/blog",
    languages: {
      'en': '/blog',
      'es': '/es/blog',
      'de': '/de/blog'
    }
  },
  openGraph: {
    title: "Blog - Sports Marketing Insights & Sponsorship Trends",
    description: "Discover athlete sponsorship stories, brand marketing tips, and influencer insights from the experts at Sport Endorse. Learn how to elevate in sports marketing.",
    type: "website",
    locale: "en_US",
    siteName: "Sport Endorse"
  }
}

export default function BlogPage() {
  return <BlogContent />
}