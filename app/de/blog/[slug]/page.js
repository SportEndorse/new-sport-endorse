import { getBlogPostSlugs, getBlogPostBySlug } from '@/utils/wordpress-api'
import BlogPostContent from '@/components/BlogPostContent'

// Function to decode HTML entities
function decodeHtmlEntities(text) {
  if (!text) return text;
  const entities = {
    '&#038;': '&',
    '&#8217;': "'",
    '&#8216;': "'",
    '&#8220;': '"',
    '&#8221;': '"',
    '&#8211;': '–',
    '&#8212;': '—',
    '&amp;': '&',
    '&quot;': '"',
    '&apos;': "'",
    '&lt;': '<',
    '&gt;': '>',
    '&nbsp;': ' '
  };
  let decodedText = text;
  for (const [entity, replacement] of Object.entries(entities)) {
    decodedText = decodedText.replace(new RegExp(entity, 'g'), replacement);
  }
  return decodedText;
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const resolvedParams = await params
  const post = await getBlogPostBySlug(resolvedParams.slug)
  
  if (!post) {
    return {
      title: 'Beitrag Nicht Gefunden | Sport Endorse',
      description: 'Der angeforderte Blog-Beitrag konnte nicht gefunden werden.'
    }
  }
  
  const title = decodeHtmlEntities(post.title?.rendered || 'Blog-Beitrag')
  const description = post.yoast_head_json?.description || 
    (post.excerpt?.rendered ? post.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 160) : 'Lesen Sie diesen Blog-Beitrag auf Sport Endorse.')
  
  return {
    title: `${title} | Sport Endorse`,
    description: decodeHtmlEntities(description),
    alternates: {
      canonical: `https://www.sportendorse.com/de/blog/${resolvedParams.slug}`,
      languages: {
        'en': `/blog/${resolvedParams.slug}`,
        'es': `/es/blog/${resolvedParams.slug}`,
        'de': `/de/blog/${resolvedParams.slug}`
      }
    },
    openGraph: {
      title,
      description: decodeHtmlEntities(description),
      type: 'article',
      locale: 'de_DE',
      publishedTime: post.date,
      authors: post._embedded?.author?.[0]?.name ? [post._embedded.author[0].name] : undefined,
      images: post._embedded?.['wp:featuredmedia']?.[0]?.source_url ? [
        {
          url: post._embedded['wp:featuredmedia'][0].source_url,
          alt: title,
          width: post._embedded['wp:featuredmedia'][0].media_details?.width || 1200,
          height: post._embedded['wp:featuredmedia'][0].media_details?.height || 630
        }
      ] : []
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: decodeHtmlEntities(description),
      images: post._embedded?.['wp:featuredmedia']?.[0]?.source_url ? [post._embedded['wp:featuredmedia'][0].source_url] : []
    }
  }
}

// Generate static params for all posts (lightweight - only fetches slugs)
export async function generateStaticParams() {
  try {
    const slugs = await getBlogPostSlugs();
    return slugs.map(slug => ({ slug }));
  } catch (error) {
    console.warn('Error generating static params for blog posts:', error);
    return [];
  }
}

export default async function BlogPost({ params }) {
  const resolvedParams = await params
  
  return <BlogPostContent slug={resolvedParams.slug} />
}