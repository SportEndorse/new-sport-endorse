import { redirect } from 'next/navigation'
import { getBlogPostSlugs } from '@/utils/wordpress-api'

// Redirect old /es/blog/[slug] URLs to new /es/[slug] URLs
export default async function BlogPostRedirect({ params }) {
  const resolvedParams = await params
  redirect(`/es/${resolvedParams.slug}`)
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
