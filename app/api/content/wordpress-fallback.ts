import { ContentLanguage, ContentType, WordPressLikePost } from '@/utils/content-repository';

const WORDPRESS_API_URL = 'https://cms.sportendorse.com/wp-json/wp/v2';

const ENDPOINT_BY_TYPE: Record<ContentType, string> = {
  blog: '/posts',
  press: '/presses',
  podcast: '/podcasts',
  success_story: '/success_stories',
};

interface WordPressApiPost {
  id: number;
  slug: string;
  date: string;
  title?: { rendered?: string };
  excerpt?: { rendered?: string };
  content?: { rendered?: string };
  featured_media_url?: string;
  success_stories_bottom_description?: string;
  yoast_head_json?: {
    og_image?: Array<{ url: string; width?: number; height?: number }>;
    description?: string;
  };
  _embedded?: {
    'wp:featuredmedia'?: Array<{ source_url: string }>;
  };
}

function getFeaturedMediaUrl(post: WordPressApiPost): string | undefined {
  return (
    post.featured_media_url ||
    post._embedded?.['wp:featuredmedia']?.[0]?.source_url ||
    post.yoast_head_json?.og_image?.[0]?.url
  );
}

function mapWordPressPost(post: WordPressApiPost): WordPressLikePost {
  const featuredMediaUrl = getFeaturedMediaUrl(post);
  const ogImage = post.yoast_head_json?.og_image?.[0]?.url || featuredMediaUrl;

  return {
    id: post.id,
    slug: post.slug,
    date: post.date,
    title: { rendered: post.title?.rendered || '' },
    excerpt: { rendered: post.excerpt?.rendered || '' },
    content: { rendered: post.content?.rendered || '' },
    ...(post.success_stories_bottom_description && {
      success_stories_bottom_description: post.success_stories_bottom_description,
    }),
    ...(featuredMediaUrl && {
      featured_media_url: featuredMediaUrl,
      _embedded: {
        'wp:featuredmedia': [{ source_url: featuredMediaUrl }],
      },
    }),
    ...(ogImage && {
      yoast_head_json: {
        og_image: [
          {
            url: ogImage,
            width: post.yoast_head_json?.og_image?.[0]?.width,
            height: post.yoast_head_json?.og_image?.[0]?.height,
          },
        ],
        ...(post.yoast_head_json?.description && {
          description: post.yoast_head_json.description,
        }),
      },
    }),
    ...(!ogImage && post.yoast_head_json?.description && {
      yoast_head_json: {
        description: post.yoast_head_json.description,
      },
    }),
  };
}

async function fetchWordPressPosts(url: URL): Promise<WordPressApiPost[]> {
  const response = await fetch(url.toString(), { cache: 'no-store' });
  if (!response.ok) {
    throw new Error(`WordPress fallback request failed (${response.status}) for ${url.pathname}`);
  }
  const data = (await response.json()) as WordPressApiPost[];
  return Array.isArray(data) ? data : [];
}

function buildWordPressUrl(options: {
  type: ContentType;
  language: ContentLanguage;
  slug?: string;
  limit?: number;
}) {
  const endpoint = ENDPOINT_BY_TYPE[options.type];
  const url = new URL(`${WORDPRESS_API_URL}${endpoint}`);

  url.searchParams.set('_embed', '1');
  url.searchParams.set('per_page', String(options.limit || 100));

  // Polylang/WPML use `lang`; if unsupported WordPress will ignore it.
  url.searchParams.set('lang', options.language);

  if (options.slug) {
    url.searchParams.set('slug', options.slug);
  } else {
    url.searchParams.set('orderby', 'date');
    url.searchParams.set('order', 'desc');
  }

  return url;
}

export async function getFallbackPostsFromWordPress(options: {
  type: ContentType;
  language: ContentLanguage;
  limit?: number;
}): Promise<WordPressLikePost[]> {
  const url = buildWordPressUrl(options);
  const items = await fetchWordPressPosts(url);
  return items.map(mapWordPressPost);
}

export async function getFallbackPostBySlugFromWordPress(options: {
  type: ContentType;
  slug: string;
  language: ContentLanguage;
}): Promise<WordPressLikePost | null> {
  const url = buildWordPressUrl(options);
  const items = await fetchWordPressPosts(url);
  return items.length > 0 ? mapWordPressPost(items[0]) : null;
}
