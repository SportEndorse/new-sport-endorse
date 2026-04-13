import { NextRequest, NextResponse } from 'next/server';
import { executeSql } from '@/utils/db';
import { ContentType, getLatestPostsUpdatedAt } from '@/utils/content-repository';

const WORDPRESS_API_URL = 'https://cms.sportendorse.com/wp-json/wp/v2';

const COLLECTIONS: Array<{ endpoint: string; type: ContentType }> = [
  { endpoint: '/posts', type: 'blog' },
  { endpoint: '/presses', type: 'press' },
  { endpoint: '/podcasts', type: 'podcast' },
  { endpoint: '/success_stories', type: 'success_story' },
];

const COLLECTION_BY_TYPE: Record<ContentType, { endpoint: string; type: ContentType }> = {
  blog: { endpoint: '/posts', type: 'blog' },
  press: { endpoint: '/presses', type: 'press' },
  podcast: { endpoint: '/podcasts', type: 'podcast' },
  success_story: { endpoint: '/success_stories', type: 'success_story' },
};

const DEFAULT_MIN_SYNC_INTERVAL_MINUTES = 30;

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

type SourcePostRow = {
  source_post_id: number;
  post_created_at: string | null;
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

async function getNextSourcePostId(): Promise<number> {
  const rows = (await executeSql(
    'SELECT COALESCE(MAX(source_post_id), 0) + 1 AS next_id FROM unified_posts',
    []
  )) as unknown as Array<{ next_id: number }>;

  return rows?.[0]?.next_id || 1;
}

async function findSourcePostRow(type: ContentType, payload: ReturnType<typeof mapWpToDb>): Promise<SourcePostRow | null> {
  if (payload.wordpressId) {
    const byWordPress = (await executeSql(
      `SELECT source_post_id, post_created_at
       FROM unified_posts
       WHERE wordpress_id = ?
       ORDER BY CASE WHEN language = 'en' THEN 0 ELSE 1 END
       LIMIT 1`,
      [payload.wordpressId]
    )) as unknown as SourcePostRow[];

    if (byWordPress.length > 0) return byWordPress[0];
  }

  const bySlug = (await executeSql(
    `SELECT source_post_id, post_created_at
     FROM unified_posts
     WHERE slug = ? AND type = ?
     ORDER BY CASE WHEN language = 'en' THEN 0 ELSE 1 END
     LIMIT 1`,
    [payload.slug, type]
  )) as unknown as SourcePostRow[];

  if (bySlug.length > 0) return bySlug[0];

  return null;
}

async function upsertPost(type: ContentType, payload: ReturnType<typeof mapWpToDb>) {
  const sourceRow = await findSourcePostRow(type, payload);
  const sourcePostId = sourceRow?.source_post_id || (await getNextSourcePostId());
  const postCreatedAt = sourceRow?.post_created_at || new Date().toISOString();

  await executeSql(
    `UPDATE unified_posts
     SET
       slug = ?,
       type = ?,
       wordpress_id = ?,
       featured_image_url = ?,
       yoast_og_image = ?,
       published_at = ?,
       post_updated_at = CURRENT_TIMESTAMP,
       updated_at = CURRENT_TIMESTAMP
     WHERE source_post_id = ?`,
    [
      payload.slug,
      type,
      payload.wordpressId,
      payload.featuredImage,
      payload.yoastOgImage,
      payload.date,
      sourcePostId,
    ]
  );

  await executeSql(
    `INSERT INTO unified_posts (
      source_post_id,
      language,
      slug,
      type,
      wordpress_id,
      featured_image_url,
      yoast_og_image,
      published_at,
      is_new,
      title,
      excerpt,
      content,
      description,
      success_stories_bottom_description,
      post_created_at,
      post_updated_at,
      content_created_at,
      content_updated_at,
      created_at,
      updated_at
    ) VALUES (?, 'en', ?, ?, ?, ?, ?, ?, 0, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    ON CONFLICT (source_post_id, language)
    DO UPDATE SET
      slug = EXCLUDED.slug,
      type = EXCLUDED.type,
      wordpress_id = EXCLUDED.wordpress_id,
      featured_image_url = EXCLUDED.featured_image_url,
      yoast_og_image = EXCLUDED.yoast_og_image,
      published_at = EXCLUDED.published_at,
      title = EXCLUDED.title,
      excerpt = EXCLUDED.excerpt,
      content = EXCLUDED.content,
      description = EXCLUDED.description,
      success_stories_bottom_description = EXCLUDED.success_stories_bottom_description,
      post_updated_at = CURRENT_TIMESTAMP,
      content_updated_at = CURRENT_TIMESTAMP,
      updated_at = CURRENT_TIMESTAMP`,
    [
      sourcePostId,
      payload.slug,
      type,
      payload.wordpressId,
      payload.featuredImage,
      payload.yoastOgImage,
      payload.date,
      payload.title,
      payload.excerpt,
      payload.content,
      payload.yoastDescription,
      payload.bottomDescription,
      postCreatedAt,
    ]
  );
}

function getMinSyncIntervalMs(): number {
  const raw = Number(process.env.WORDPRESS_SYNC_MIN_INTERVAL_MINUTES || DEFAULT_MIN_SYNC_INTERVAL_MINUTES);
  const minutes = Number.isFinite(raw) && raw >= 0 ? raw : DEFAULT_MIN_SYNC_INTERVAL_MINUTES;
  return Math.floor(minutes * 60 * 1000);
}

function canRunSync(request: NextRequest): boolean {
  const secret = process.env.WORDPRESS_SYNC_SECRET || process.env.CRON_SECRET;
  if (!secret) return true;

  const authHeader = request.headers.get('authorization');
  if (authHeader === `Bearer ${secret}`) return true;

  const key = new URL(request.url).searchParams.get('key');
  return key === secret;
}

async function runSync(request: NextRequest) {
  if (!canRunSync(request)) {
    return NextResponse.json({ error: 'Unauthorized sync request' }, { status: 401, headers: { 'Cache-Control': 'no-store' } });
  }

  const url = new URL(request.url);
  const force = url.searchParams.get('force') === 'true';
  const typeParam = url.searchParams.get('type') as ContentType | null;

  try {
    const selectedCollections = typeParam
      ? COLLECTION_BY_TYPE[typeParam]
        ? [COLLECTION_BY_TYPE[typeParam]]
        : null
      : COLLECTIONS;

    if (!selectedCollections) {
      return NextResponse.json(
        {
          error: `Unsupported type ${typeParam}. Use one of: blog, press, podcast, success_story`,
        },
        { status: 400, headers: { 'Cache-Control': 'no-store' } }
      );
    }

    const lastUpdated = await getLatestPostsUpdatedAt();
    const minIntervalMs = getMinSyncIntervalMs();

    if (!force && lastUpdated) {
      const delta = Date.now() - new Date(lastUpdated).getTime();
      if (delta < minIntervalMs) {
        return NextResponse.json(
          {
            skipped: true,
            lastUpdated,
            minIntervalMinutes: Math.floor(minIntervalMs / (60 * 1000)),
          },
          { headers: { 'Cache-Control': 'no-store' } }
        );
      }
    }

    const summaries = [] as Array<{ type: ContentType; count: number }>;

    for (const { endpoint, type } of selectedCollections) {
      const wpItems = await fetchAllFromWordPress(endpoint);
      for (const item of wpItems) {
        const mapped = mapWpToDb(item);
        await upsertPost(type, mapped);
      }
      summaries.push({ type, count: wpItems.length });
    }

    return NextResponse.json(
      {
        ok: true,
        forced: force,
        type: typeParam || 'all',
        minIntervalMinutes: Math.floor(minIntervalMs / (60 * 1000)),
        summaries,
      },
      { headers: { 'Cache-Control': 'no-store' } }
    );
  } catch (error) {
    console.error('Sync from WordPress failed:', error);

    const details = {
      code: (error as { code?: string })?.code || null,
      message: (error as { message?: string })?.message || 'Unknown error',
    };

    const hint = (error as { message?: string })?.message?.includes('no such table')
      ? 'Database schema missing. Run: turso db shell sportendorse-prod < scripts/turso-schema.sql and then turso db shell sportendorse-prod < scripts/migrate-to-unified-posts.sql'
      : null;

    return NextResponse.json(
      { error: 'Sync failed', details, hint },
      { status: 500, headers: { 'Cache-Control': 'no-store' } }
    );
  }
}

// Allow both POST (manual/webhook) and GET (Vercel Cron) triggers.
export async function POST(request: NextRequest) {
  return runSync(request);
}

export async function GET(request: NextRequest) {
  return runSync(request);
}
