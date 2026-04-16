import { executeSql } from './db';

export type ContentLanguage = 'en' | 'es' | 'de' | 'fr';
export type ContentType = 'blog' | 'press' | 'podcast' | 'success_story';

export interface WordPressLikePost {
  id: number;
  slug: string;
  date: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content?: { rendered: string };
  featured_media_url?: string;
  success_stories_bottom_description?: string;
  yoast_head_json?: {
    og_image?: Array<{ url: string; width?: number | null; height?: number | null }>;
    description?: string | null;
  };
  _embedded?: {
    'wp:featuredmedia'?: Array<{ source_url: string }>;
  };
}

interface UnifiedPostRow {
  id: number;
  slug: string;
  type: string;
  wordpress_id: number | null;
  featured_image_url: string | null;
  yoast_og_image: string | null;
  created_at: string | null;
  updated_at: string | null;
  published_at: string | null;
  title: string | null;
  excerpt: string | null;
  description: string | null;
  content: string | null;
  success_stories_bottom_description: string | null;
}

interface UnifiedPostMetaRow {
  source_post_id: number;
  wordpress_id: number | null;
  featured_image_url: string | null;
  yoast_og_image: string | null;
  published_at: string | null;
  is_new: number | null;
  post_created_at: string | null;
  post_updated_at: string | null;
}

function mapRowToPost(row: UnifiedPostRow): WordPressLikePost {
  const date = row.published_at || row.created_at || row.updated_at || new Date().toISOString();
  const featured = row.featured_image_url || row.yoast_og_image || undefined;
  const ogImage = row.yoast_og_image || row.featured_image_url || undefined;

  const title = row.title?.trim() || '';
  const excerpt = row.excerpt?.trim() || '';
  const content = row.content?.trim() || '';
  const description = row.description?.trim() || '';
  const bottomDesc = row.success_stories_bottom_description?.trim() || '';

  return {
    id: row.id,
    slug: row.slug,
    date,
    title: { rendered: title },
    excerpt: { rendered: excerpt },
    content: { rendered: content },
    ...(bottomDesc && {
      success_stories_bottom_description: bottomDesc,
    }),
    ...(ogImage && {
      yoast_head_json: {
        og_image: [{ url: ogImage, width: null, height: null }],
        ...(description && { description }),
      },
    }),
    ...(!ogImage && description && {
      yoast_head_json: { description },
    }),
    ...(featured && {
      featured_media_url: featured,
      _embedded: { 'wp:featuredmedia': [{ source_url: featured }] },
    }),
  };
}

export async function getPostsFromDb(options: {
  type: ContentType;
  language?: ContentLanguage;
  limit?: number;
}): Promise<WordPressLikePost[]> {
  const language = options.language || 'en';

  let sql = `
    SELECT
      source_post_id AS id,
      slug,
      type,
      wordpress_id,
      featured_image_url,
      yoast_og_image,
      post_created_at AS created_at,
      COALESCE(content_updated_at, post_updated_at, updated_at) AS updated_at,
      published_at,
      title,
      excerpt,
      description,
      content,
      success_stories_bottom_description
    FROM unified_posts
    WHERE type = ? AND language = ?
    ORDER BY
      CASE WHEN published_at IS NOT NULL THEN 0 ELSE 1 END ASC,
      CASE WHEN published_at IS NOT NULL THEN published_at ELSE COALESCE(content_updated_at, post_updated_at, updated_at) END DESC,
      source_post_id DESC
  `;

  const params: any[] = [options.type, language];

  if (options.limit) {
    sql += ' LIMIT ?';
    params.push(options.limit);
  }

  const rows = (await executeSql(sql, params)) as unknown as UnifiedPostRow[];
  return rows.map(mapRowToPost);
}

export async function getPostBySlugFromDb(options: {
  type: ContentType;
  slug: string;
  language?: ContentLanguage;
}): Promise<WordPressLikePost | null> {
  const language = options.language || 'en';

  const rows = (await executeSql(
    `
      SELECT
        source_post_id AS id,
        slug,
        type,
        wordpress_id,
        featured_image_url,
        yoast_og_image,
        post_created_at AS created_at,
        COALESCE(content_updated_at, post_updated_at, updated_at) AS updated_at,
        published_at,
        title,
        excerpt,
        description,
        content,
        success_stories_bottom_description
      FROM unified_posts
      WHERE type = ? AND slug = ? AND language = ?
      LIMIT 1
    `,
    [options.type, options.slug, language]
  )) as unknown as UnifiedPostRow[];

  if (!rows || rows.length === 0) return null;
  return mapRowToPost(rows[0]);
}

export async function getLatestPostsUpdatedAt(): Promise<string | null> {
  const rows = (await executeSql(
    `
      SELECT updated_at AS max
      FROM unified_posts
      ORDER BY updated_at DESC
      LIMIT 1
    `,
    []
  )) as unknown as Array<{ max: string | null }>;

  return rows?.[0]?.max || null;
}

export async function upsertPostContent(options: {
  type: ContentType;
  slug: string;
  language: ContentLanguage;
  title: string;
  excerpt?: string | null;
  content?: string | null;
  yoastDescription?: string | null;
  bottomDescription?: string | null;
}): Promise<void> {
  const metaRows = (await executeSql(
    `
      SELECT
        source_post_id,
        wordpress_id,
        featured_image_url,
        yoast_og_image,
        published_at,
        is_new,
        post_created_at,
        post_updated_at
      FROM unified_posts
      WHERE slug = ? AND type = ? AND language IN (?, 'en')
      ORDER BY CASE WHEN language = ? THEN 0 ELSE 1 END
      LIMIT 1
    `,
    [options.slug, options.type, options.language, options.language]
  )) as unknown as UnifiedPostMetaRow[];

  if (metaRows.length === 0) return;

  const meta = metaRows[0];

  await executeSql(
    `
      INSERT INTO unified_posts (
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
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      ON CONFLICT (source_post_id, language)
      DO UPDATE SET
        slug = EXCLUDED.slug,
        type = EXCLUDED.type,
        wordpress_id = EXCLUDED.wordpress_id,
        featured_image_url = EXCLUDED.featured_image_url,
        yoast_og_image = EXCLUDED.yoast_og_image,
        published_at = EXCLUDED.published_at,
        is_new = EXCLUDED.is_new,
        title = EXCLUDED.title,
        excerpt = EXCLUDED.excerpt,
        content = EXCLUDED.content,
        description = EXCLUDED.description,
        success_stories_bottom_description = EXCLUDED.success_stories_bottom_description,
        post_updated_at = EXCLUDED.post_updated_at,
        content_updated_at = CURRENT_TIMESTAMP,
        updated_at = CURRENT_TIMESTAMP
    `,
    [
      meta.source_post_id,
      options.language,
      options.slug,
      options.type,
      meta.wordpress_id,
      meta.featured_image_url,
      meta.yoast_og_image,
      meta.published_at,
      meta.is_new || 0,
      options.title,
      options.excerpt || null,
      options.content || null,
      options.yoastDescription || null,
      options.bottomDescription || null,
      meta.post_created_at,
      meta.post_updated_at,
    ]
  );
}
