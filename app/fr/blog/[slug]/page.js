import { redirect } from 'next/navigation'
import { getBlogPostSlugs } from '@/utils/wordpress-api'

// Redirect old /fr/blog/[slug] URLs to new /fr/[slug] URLs
export default async function BlogPostRedirect({ params }) {
  const resolvedParams = await params
  redirect(`/fr/${resolvedParams.slug}`)
}

// Generate static params for all posts
export async function generateStaticParams() {
  try {
    const slugs = await getBlogPostSlugs();
    return slugs.map(slug => ({ slug }));
  } catch (error) {
    console.warn('Error generating static params for blog redirect:', error);
    return [];
  }
}
