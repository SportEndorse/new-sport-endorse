import { getSuccessStorySlugs } from '@/utils/wordpress-api'
import SuccessStoryContent from '@/components/SuccessStoryContent'

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
  try {
    const resolvedParams = await params
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')
    const apiUrl = new URL(`/api/content?type=success_story&slug=${encodeURIComponent(resolvedParams.slug)}&language=fr`, baseUrl)

    const response = await fetch(apiUrl.toString(), {
      next: { revalidate: 3600 },
    })
    const payload = response.ok ? await response.json() : null
    const story = payload?.post
    
    if (!story) {
      return {
        title: 'Histoire de réussite introuvable | Sport Endorse',
        description: 'La page demandée est introuvable.',
      }
    }
    
    const title = decodeHtmlEntities(story.title?.rendered || 'Histoire de réussite')
    const description = story.yoast_head_json?.description || 
      (story.excerpt?.rendered ? story.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 160) : 'Découvrez cette histoire de réussite inspirante.')
    
    return {
      title: `${title} | Sport Endorse`,
      description: decodeHtmlEntities(description),
      alternates: {
        canonical: `https://www.sportendorse.com/fr/success_stories/${resolvedParams.slug}`,
        languages: {
          'en': `/success_stories/${resolvedParams.slug}`,
          'es': `/es/success_stories/${resolvedParams.slug}`,
          'de': `/de/success_stories/${resolvedParams.slug}`,
          'fr': `/fr/success_stories/${resolvedParams.slug}`
        }
      },
      openGraph: {
        title,
        description: decodeHtmlEntities(description),
        type: 'article',
        locale: 'fr_FR',
        publishedTime: story.date,
        images: story.yoast_head_json?.og_image?.[0]?.url ? [
          {
            url: story.yoast_head_json.og_image[0].url,
            alt: title,
            width: story.yoast_head_json.og_image[0].width || 1200,
            height: story.yoast_head_json.og_image[0].height || 630
          }
        ] : []
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description: decodeHtmlEntities(description),
        images: story.yoast_head_json?.og_image?.[0]?.url ? [story.yoast_head_json.og_image[0].url] : []
      }
    }
  } catch (error) {
    console.warn('Error generating metadata for success story:', error)
    return {
      title: 'Histoire de réussite | Sport Endorse',
      description: 'Découvrez des histoires de réussite inspirantes sur Sport Endorse.'
    }
  }
}

// Generate static params for all success stories (lightweight - only fetches slugs)
export async function generateStaticParams() {
  try {
    const slugs = await getSuccessStorySlugs();
    return slugs.map(slug => ({ slug }));
  } catch (error) {
    console.warn('Error generating static params for success stories:', error);
    return [];
  }
}

export default async function SuccessStoryPost({ params }) {
  const resolvedParams = await params
  
  return <SuccessStoryContent slug={resolvedParams.slug} />
}