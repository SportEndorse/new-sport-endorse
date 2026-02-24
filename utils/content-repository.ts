import { getDb } from './db';

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
    'wp:featuredmedia'?: Array<{ source_url: string }>
  };
}

function isMissingRelationError(error: unknown): boolean {
  return Boolean((error as { code?: string })?.code === '42P01');
}

interface DbPostRow {
  id: number;
  slug: string;
  type: string;
  wordpress_id: number | null;
  featured_image_url: string | null;
  yoast_og_image: string | null;
  success_stories_bottom_description: string | null;
  created_at: string | null;
  updated_at: string | null;
  published_at: string | null;
  title: string | null;
  excerpt: string | null;
  content: string | null;
}

function mapRowToPost(row: DbPostRow): WordPressLikePost {
  const date = row.published_at || row.created_at || row.updated_at || new Date().toISOString();
  const featured = row.featured_image_url || row.yoast_og_image || undefined;
  const ogImage = row.yoast_og_image || row.featured_image_url || undefined;

  const post: WordPressLikePost = {
    id: row.id,
    slug: row.slug,
    date,
    title: { rendered: row.title || '' },
    excerpt: { rendered: row.excerpt || '' },
    ...(row.content && { content: { rendered: row.content } }),
    ...(row.success_stories_bottom_description && {
      success_stories_bottom_description: row.success_stories_bottom_description,
    }),
    ...(ogImage && {
      yoast_head_json: {
        og_image: [
          {
            url: ogImage,
            width: null,
            height: null,
          },
        ],
      },
    }),
    ...(featured && {
      featured_media_url: featured,
      _embedded: { 'wp:featuredmedia': [{ source_url: featured }] },
    }),
  };

  return post;
}

export async function getPostsFromDb(options: {
  type: ContentType;
  language?: ContentLanguage;
  limit?: number;
}): Promise<WordPressLikePost[]> {
  const sql = getDb();
  const language = options.language || 'en';

  try {
    const rows = (await sql`
      SELECT
        p.id,
        p.slug,
        p.type,
        p.wordpress_id,
        p.featured_image_url,
        p.yoast_og_image,
        p.success_stories_bottom_description,
        p.created_at,
        p.updated_at,
        p.published_at,
        COALESCE(pc_lang.title, pc_en.title) AS title,
        COALESCE(pc_lang.excerpt, pc_en.excerpt) AS excerpt,
          COALESCE(pc_lang.content, pc_en.content) AS content
      FROM posts p
      LEFT JOIN post_content pc_lang ON pc_lang.post_id = p.id AND pc_lang.language = ${language}
      LEFT JOIN post_content pc_en ON pc_en.post_id = p.id AND pc_en.language = 'en'
      WHERE p.type = ${options.type}
      ORDER BY p.published_at DESC NULLS LAST, p.updated_at DESC NULLS LAST, p.id DESC
      ${options.limit ? sql`LIMIT ${options.limit}` : sql``}
    `) as unknown as DbPostRow[];

    return rows.map(mapRowToPost);
  } catch (error) {
    if (isMissingRelationError(error)) {
      console.error('post_content table is missing; returning empty set.');
      return [];
    }
    throw error;
  }
}

export async function getPostBySlugFromDb(options: {
  type: ContentType;
  slug: string;
  language?: ContentLanguage;
}): Promise<WordPressLikePost | null> {
  const sql = getDb();
  const language = options.language || 'en';

  try {
    const rows = (await sql`
      SELECT
        p.id,
        p.slug,
        p.type,
        p.wordpress_id,
        p.featured_image_url,
        p.yoast_og_image,
        p.success_stories_bottom_description,
        p.created_at,
        p.updated_at,
        p.published_at,
        COALESCE(pc_lang.title, pc_en.title) AS title,
        COALESCE(pc_lang.excerpt, pc_en.excerpt) AS excerpt,
        COALESCE(pc_lang.content, pc_en.content) AS content
      FROM posts p
      LEFT JOIN post_content pc_lang ON pc_lang.post_id = p.id AND pc_lang.language = ${language}
      LEFT JOIN post_content pc_en ON pc_en.post_id = p.id AND pc_en.language = 'en'
      WHERE p.type = ${options.type} AND p.slug = ${options.slug}
      LIMIT 1
    `) as unknown as DbPostRow[];

    if (!rows || rows.length === 0) return null;
    return mapRowToPost(rows[0]);
  } catch (error) {
    if (isMissingRelationError(error)) {
      console.error('post_content table is missing; returning null.');
      return null;
    }
    throw error;
  }
}

export async function getLatestPostsUpdatedAt(): Promise<string | null> {
  const sql = getDb();
  try {
    const rows = (await sql`
      SELECT MAX(updated_at) AS max FROM posts
    `) as unknown as Array<{ max: string | null }>;
    return rows?.[0]?.max || null;
  } catch (error) {
    if (isMissingRelationError(error)) {
      console.error('posts table is missing; returning null for latest updated at.');
      return null;
    }
    throw error;
  }
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
  const sql = getDb();
  try {
    const postRows = (await sql`
      SELECT id FROM posts WHERE slug = ${options.slug} AND type = ${options.type} LIMIT 1
    `) as unknown as Array<{ id: number }>;

    if (!postRows || postRows.length === 0) return;
    const postId = postRows[0].id;

    await sql`
      INSERT INTO post_content (
        post_id,
        language,
        title,
        excerpt,
        content
      ) VALUES (
        ${postId},
        ${options.language},
        ${options.title},
        ${options.excerpt || ''},
        ${options.content || null}
      )
      ON CONFLICT (post_id, language)
      DO UPDATE SET
        title = EXCLUDED.title,
        excerpt = EXCLUDED.excerpt,
        content = EXCLUDED.content
    `;
  } catch (error) {
    if (isMissingRelationError(error)) {
      console.error('posts or post_content table is missing; skip upsert.');
      return;
    }
    throw error;
  }
}
