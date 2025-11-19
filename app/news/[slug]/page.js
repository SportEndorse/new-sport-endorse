import { getNewsStorySlugs, getNewsStoryBySlug } from '@/utils/wordpress-api';
import NewsStoryContent from '@/components/NewsStoryContent';

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
  const resolvedParams = await params;
  const newsStory = await getNewsStoryBySlug(resolvedParams.slug);
  
  if (!newsStory) {
    return {
      title: 'News Story Not Found | Sport Endorse',
      description: 'The requested news story could not be found.'
    }
  }
  
  const title = decodeHtmlEntities(newsStory.title?.rendered || 'News Story')
  const description = newsStory.yoast_head_json?.description || 
    (newsStory.excerpt?.rendered ? newsStory.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 160) : 'Read this news story on Sport Endorse.')
  
  return {
    title: `${title} | Sport Endorse`,
    description: decodeHtmlEntities(description),
    alternates: {
      canonical: `https://www.sportendorse.com/news/${resolvedParams.slug}`,
      languages: {
        'en': `/news/${resolvedParams.slug}`,
        'es': `/es/news/${resolvedParams.slug}`,
        'de': `/de/news/${resolvedParams.slug}`
      }
    },
    openGraph: {
      title,
      description: decodeHtmlEntities(description),
      type: 'article',
      publishedTime: newsStory.date,
      authors: newsStory._embedded?.author?.[0]?.name ? [newsStory._embedded.author[0].name] : undefined,
      images: newsStory.yoast_head_json?.og_image?.[0]?.url ? [
        {
          url: newsStory.yoast_head_json.og_image[0].url,
          alt: title,
          width: newsStory.yoast_head_json.og_image[0].width || 1200,
          height: newsStory.yoast_head_json.og_image[0].height || 630
        }
      ] : []
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: decodeHtmlEntities(description),
      images: newsStory.yoast_head_json?.og_image?.[0]?.url ? [newsStory.yoast_head_json.og_image[0].url] : []
    }
  }
}

// Generate static params for all news stories (lightweight - only fetches slugs)
export async function generateStaticParams() {
  try {
    const slugs = await getNewsStorySlugs();
    return slugs.map(slug => ({ slug }));
  } catch (error) {
    console.warn('Error generating static params for news stories:', error);
    return [];
  }
}

export default async function NewsStoryPost({ params }) {
  const resolvedParams = await params;
  
  return <NewsStoryContent slug={resolvedParams.slug} />;
}