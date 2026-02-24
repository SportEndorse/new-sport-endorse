import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/utils/db';
import { ContentType, getLatestPostsUpdatedAt } from '@/utils/content-repository';

const WORDPRESS_API_URL = 'https://cms.sportendorse.com/wp-json/wp/v2';

const COLLECTIONS: Array<{ endpoint: string; type: ContentType }> = [
  { endpoint: '/posts', type: 'blog' },
  { endpoint: '/presses', type: 'press' },
  { endpoint: '/podcasts', type: 'podcast' },
  { endpoint: '/success_stories', type: 'success_story' },
];

type WordPressPost = {
  id: number;
  slug: string;
  date: string;
  title?: { rendered?: string };
  excerpt?: { rendered?: string };
  content?: { rendered?: string };
  yoast_head_json?: { description?: string; og_image?: Array<{ url: string }> };
  success_stories_bottom_description?: string;
  _embedded?: { 'wp:featuredmedia'?: Array<{ source_url: string }> };
};

async function fetchAllFromWordPress(endpoint: string): Promise<WordPressPost[]> {
  let page = 1;
  let hasMore = true;
  const items: WordPressPost[] = [];

  while (hasMore) {
    const response = await fetch(
      `${WORDPRESS_API_URL}${endpoint}${endpoint.includes('?') ? '&' : '?'}_embed&per_page=100&page=${page}`,
      { next: { revalidate: 0 } }
    );

    if (!response.ok) {
      if (response.status === 404) break;
      throw new Error(`WP fetch ${endpoint} page ${page} failed: ${response.status}`);
    }

    const pageItems = (await response.json()) as WordPressPost[];
    if (!pageItems || pageItems.length === 0) {
      hasMore = false;
      break;
    }

    items.push(...pageItems);
    page += 1;

    const totalPages = response.headers.get('X-WP-TotalPages');
    if (totalPages && page > parseInt(totalPages, 10)) {
      hasMore = false;
    }
  }

  return items;
}

function mapWpToDb(post: WordPressPost) {
  const featured =
    post._embedded?.['wp:featuredmedia']?.[0]?.source_url || post.yoast_head_json?.og_image?.[0]?.url || null;

  return {
    slug: post.slug,
    wordpressId: post.id,
    date: post.date,
    title: post.title?.rendered || '',
    excerpt: post.excerpt?.rendered || '',
    content: post.content?.rendered || null,
    yoastDescription: post.yoast_head_json?.description || null,
    featuredImage: featured,
    yoastOgImage: post.yoast_head_json?.og_image?.[0]?.url || null,
    bottomDescription: post.success_stories_bottom_description || null,
  };
}

async function upsertPost(type: ContentType, payload: ReturnType<typeof mapWpToDb>) {
  const sql = getDb();

  const [postRow] = (await sql`
    INSERT INTO posts (
      wordpress_id,
      slug,
      type,
      featured_image_url,
      yoast_og_image,
      success_stories_bottom_description,
      published_at,
      updated_at
    ) VALUES (
      ${payload.wordpressId},
      ${payload.slug},
      ${type},
      ${payload.featuredImage},
      ${payload.yoastOgImage},
      ${payload.bottomDescription},
      ${payload.date},
      NOW()
    )
    ON CONFLICT (wordpress_id)
    DO UPDATE SET
      slug = EXCLUDED.slug,
      type = EXCLUDED.type,
      featured_image_url = EXCLUDED.featured_image_url,
      yoast_og_image = EXCLUDED.yoast_og_image,
      success_stories_bottom_description = EXCLUDED.success_stories_bottom_description,
      published_at = EXCLUDED.published_at,
      updated_at = NOW()
    RETURNING id
  `) as unknown as Array<{ id: number }>;

  const postId = postRow.id;

    await sql`
    INSERT INTO post_content (
      post_id,
      language,
      title,
      excerpt,
      content,
      yoast_description,
      success_stories_bottom_description
    ) VALUES (
      ${postId},
      'en',
      ${payload.title},
      ${payload.excerpt},
      ${payload.content},
      ${payload.yoastDescription},
      ${payload.bottomDescription}
    )
    ON CONFLICT (post_id, language)
    DO UPDATE SET
      title = EXCLUDED.title,
      excerpt = EXCLUDED.excerpt,
      content = EXCLUDED.content,
      yoast_description = EXCLUDED.yoast_description,
      success_stories_bottom_description = EXCLUDED.success_stories_bottom_description
  `;
}

export async function POST(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const force = url.searchParams.get('force') === 'true';

    const lastUpdated = await getLatestPostsUpdatedAt();
    if (!force && lastUpdated) {
      const delta = Date.now() - new Date(lastUpdated).getTime();
      if (delta < 1000 * 60 * 60 * 20) {
        return NextResponse.json({ skipped: true, lastUpdated });
      }
    }

    const summaries = [] as Array<{ type: ContentType; count: number }>;

    for (const { endpoint, type } of COLLECTIONS) {
      const wpItems = await fetchAllFromWordPress(endpoint);
      for (const item of wpItems) {
        const mapped = mapWpToDb(item);
        await upsertPost(type, mapped);
      }
      summaries.push({ type, count: wpItems.length });
    }

    return NextResponse.json({ ok: true, summaries });
  } catch (error) {
    console.error('Sync from WordPress failed:', error);
    return NextResponse.json({ error: 'Sync failed' }, { status: 500 });
  }
}
