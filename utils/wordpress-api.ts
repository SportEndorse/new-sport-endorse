// Lightweight server-side WordPress API functions
// These are optimized for server-side use (metadata, static params)
// and fetch minimal data

const WORDPRESS_API_URL = 'https://www.cms.sportendorse.com/wp-json/wp/v2';

interface WordPressSlug {
  slug: string;
}

interface WordPressPost {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  content?: { rendered: string };
  date: string;
  slug: string;
  featured_media_url?: string;
  success_stories_bottom_description?: string;
  yoast_head_json?: {
    og_image?: Array<{ url: string; width?: number; height?: number }>;
    description?: string;
  };
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      media_details?: { width?: number; height?: number };
    }>;
    author?: Array<{ name: string }>;
  };
}

// Fetch only slugs (minimal data) for static params generation
export async function fetchSlugsOnly(endpoint: string): Promise<string[]> {
  let allSlugs: string[] = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    try {
      // Fetch with per_page=100 to minimize requests, and only request slug field
      const response = await fetch(
        `${WORDPRESS_API_URL}${endpoint}?per_page=100&page=${page}&_fields=slug`,
        {
          next: { revalidate: 86400 }, // Cache for 24 hours
        }
      );

      if (!response.ok) {
        if (response.status === 404) {
          hasMore = false;
          break;
        }
        console.warn(`Failed to fetch slugs from ${endpoint} page ${page}: ${response.status}`);
        break;
      }

      const items = await response.json();

      if (!items || items.length === 0) {
        hasMore = false;
        break;
      }

      allSlugs = allSlugs.concat(items.map((item: WordPressSlug) => item.slug));
      page++;

      const totalPages = response.headers.get('X-WP-TotalPages');
      if (totalPages && page > parseInt(totalPages)) {
        hasMore = false;
      }
    } catch (error) {
      console.error(`Error fetching slugs from ${endpoint} page ${page}:`, error);
      break;
    }
  }

  return allSlugs;
}

// Fetch a single item by slug (for metadata generation)
export async function fetchItemBySlug(
  endpoint: string,
  slug: string
): Promise<WordPressPost | null> {
  try {
    const response = await fetch(
      `${WORDPRESS_API_URL}${endpoint}?slug=${slug}&_embed`,
      {
        next: { revalidate: 86400 },
      }
    );

    if (!response.ok) {
      return null;
    }

    const items = await response.json();
    return items[0] || null;
  } catch (error) {
    console.error(`Error fetching item by slug from ${endpoint}:`, error);
    return null;
  }
}

// Specific functions for each content type
export async function getSuccessStorySlugs(): Promise<string[]> {
  return await fetchSlugsOnly('/success_stories');
}

export async function getSuccessStoryBySlug(slug: string): Promise<WordPressPost | null> {
  return await fetchItemBySlug('/success_stories', slug);
}

export async function getBlogPostSlugs(): Promise<string[]> {
  return fetchSlugsOnly('/posts');
}

export async function getBlogPostBySlug(slug: string): Promise<WordPressPost | null> {
  return fetchItemBySlug('/posts', slug);
}

export async function getNewsStorySlugs(): Promise<string[]> {
  return fetchSlugsOnly('/presses');
}

export async function getNewsStoryBySlug(slug: string): Promise<WordPressPost | null> {
  return fetchItemBySlug('/presses', slug);
}

export async function getPodcastSlugs(): Promise<string[]> {
  return fetchSlugsOnly('/podcasts');
}

export async function getPodcastBySlug(slug: string): Promise<WordPressPost | null> {
  return fetchItemBySlug('/podcasts', slug);
}

