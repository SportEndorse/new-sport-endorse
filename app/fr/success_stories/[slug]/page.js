import { getSuccessStorySlugs, getSuccessStoryBySlug } from '@/utils/wordpress-api'
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
    const story = await getSuccessStoryBySlug(resolvedParams.slug)
    
    if (!story) {
      return {
        title: 'Historia de Éxito No Encontrada | Sport Endorse',
        description: 'La historia de éxito solicitada no se pudo encontrar.'
      }
    }
    
    const title = decodeHtmlEntities(story.title?.rendered || 'Historia de Éxito')
    const description = story.yoast_head_json?.description || 
      (story.excerpt?.rendered ? story.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 160) : 'Lea esta historia de éxito inspiradora.')
    
    return {
      title: `${title} | Sport Endorse`,
      description: decodeHtmlEntities(description),
      alternates: {
        canonical: `https://www.sportendorse.com/es/success_stories/${resolvedParams.slug}`,
        languages: {
          'en': `/success_stories/${resolvedParams.slug}`,
          'es': `/es/success_stories/${resolvedParams.slug}`,
          'de': `/de/success_stories/${resolvedParams.slug}`
        }
      },
      openGraph: {
        title,
        description: decodeHtmlEntities(description),
        type: 'article',
        locale: 'es_ES',
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
      title: 'Historia de Éxito | Sport Endorse',
      description: 'Lea historias de éxito inspiradoras en Sport Endorse.'
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