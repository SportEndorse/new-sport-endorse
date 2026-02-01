import { getPodcastSlugs, getPodcastBySlug } from '@/utils/wordpress-api'
import PodcastContent from '@/components/PodcastContent'

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
  const podcast = await getPodcastBySlug(resolvedParams.slug)
  
  if (!podcast) {
    return {
      title: 'Podcast Non Trouvé | Sport Endorse',
      description: 'L\'épisode de podcast demandé n\'a pas pu être trouvé.'
    }
  }
  
  const title = decodeHtmlEntities(podcast.title?.rendered || 'Épisode de Podcast')
  const description = podcast.yoast_head_json?.description || 
    (podcast.excerpt?.rendered ? podcast.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 160) : 'Écoutez cet épisode de podcast sur Sport Endorse.')
  
  return {
    title: `${title} | Sport Endorse`,
    description: decodeHtmlEntities(description),
    alternates: {
      canonical: `https://www.sportendorse.com/fr/podcasts/${resolvedParams.slug}`,
      languages: {
        'en': `/podcasts/${resolvedParams.slug}`,
        'es': `/es/podcasts/${resolvedParams.slug}`,
        'de': `/de/podcasts/${resolvedParams.slug}`,
        'fr': `/fr/podcasts/${resolvedParams.slug}`
      }
    },
    openGraph: {
      title,
      description: decodeHtmlEntities(description),
      type: 'article',
      locale: 'fr_FR',
      publishedTime: podcast.date,
      images: podcast.yoast_head_json?.og_image?.[0]?.url ? [
        {
          url: podcast.yoast_head_json.og_image[0].url,
          alt: title,
          width: podcast.yoast_head_json.og_image[0].width || 1200,
          height: podcast.yoast_head_json.og_image[0].height || 630
        }
      ] : []
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: decodeHtmlEntities(description),
      images: podcast.yoast_head_json?.og_image?.[0]?.url ? [podcast.yoast_head_json.og_image[0].url] : []
    }
  }
}

// Generate static params for all podcasts
export async function generateStaticParams() {
  try {
    const slugs = await getPodcastSlugs();
    return slugs.map(slug => ({ slug }));
  } catch (error) {
    console.warn('Error generating static params for podcasts:', error);
    return [];
  }
}

export default async function PodcastPost({ params }) {
  const resolvedParams = await params
  
  return <PodcastContent slug={resolvedParams.slug} />
}