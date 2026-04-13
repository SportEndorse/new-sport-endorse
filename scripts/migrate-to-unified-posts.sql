-- Migration: merge posts + post_content into one denormalized table
-- Safe to run multiple times (uses UPSERT)
-- Keeps old tables intact so rollback is easy

BEGIN TRANSACTION;

CREATE TABLE IF NOT EXISTS unified_posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  -- Original source IDs so no information is lost
  source_post_id INTEGER NOT NULL,
  source_post_content_id INTEGER,

  -- Query dimensions
  language TEXT NOT NULL,
  slug TEXT NOT NULL,
  type TEXT NOT NULL,

  -- Post-level metadata (from posts)
  wordpress_id INTEGER,
  featured_image_url TEXT,
  yoast_og_image TEXT,
  published_at TEXT,
  is_new NUMERIC DEFAULT 0,

  -- Content-level fields (from post_content)
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT,
  description TEXT,
  source_hash TEXT,
  success_stories_bottom_description TEXT,

  -- Original timestamps from each source table
  post_created_at TEXT,
  post_updated_at TEXT,
  content_created_at TEXT,
  content_updated_at TEXT,

  -- Unified row timestamps
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP,

  -- One row per (post, language)
  UNIQUE(source_post_id, language)
);

-- Read-optimized indexes for current query patterns
CREATE INDEX IF NOT EXISTS idx_unified_posts_type_language_published
  ON unified_posts(type, language, published_at DESC, source_post_id DESC);

CREATE INDEX IF NOT EXISTS idx_unified_posts_slug_type_language
  ON unified_posts(slug, type, language);

CREATE INDEX IF NOT EXISTS idx_unified_posts_wordpress_language
  ON unified_posts(wordpress_id, language);

CREATE INDEX IF NOT EXISTS idx_unified_posts_language
  ON unified_posts(language);

CREATE INDEX IF NOT EXISTS idx_unified_posts_source_post
  ON unified_posts(source_post_id);

CREATE INDEX IF NOT EXISTS idx_unified_posts_updated
  ON unified_posts(updated_at DESC);

-- Backfill from existing schema
INSERT INTO unified_posts (
  source_post_id,
  source_post_content_id,
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
  source_hash,
  success_stories_bottom_description,
  post_created_at,
  post_updated_at,
  content_created_at,
  content_updated_at,
  created_at,
  updated_at
)
SELECT
  p.id AS source_post_id,
  pc.id AS source_post_content_id,
  pc.language,
  p.slug,
  p.type,
  p.wordpress_id,
  p.featured_image_url,
  p.yoast_og_image,
  p.published_at,
  p.is_new,
  COALESCE(pc.title, '') AS title,
  pc.excerpt,
  pc.content,
  pc.description,
  pc.source_hash,
  CAST(pc.success_stories_bottom_description AS TEXT) AS success_stories_bottom_description,
  p.created_at AS post_created_at,
  p.updated_at AS post_updated_at,
  pc.created_at AS content_created_at,
  pc.updated_at AS content_updated_at,
  COALESCE(pc.created_at, p.created_at, CURRENT_TIMESTAMP) AS created_at,
  COALESCE(pc.updated_at, p.updated_at, CURRENT_TIMESTAMP) AS updated_at
FROM posts p
INNER JOIN post_content pc ON pc.post_id = p.id
ON CONFLICT(source_post_id, language) DO UPDATE SET
  source_post_content_id = excluded.source_post_content_id,
  slug = excluded.slug,
  type = excluded.type,
  wordpress_id = excluded.wordpress_id,
  featured_image_url = excluded.featured_image_url,
  yoast_og_image = excluded.yoast_og_image,
  published_at = excluded.published_at,
  is_new = excluded.is_new,
  title = excluded.title,
  excerpt = excluded.excerpt,
  content = excluded.content,
  description = excluded.description,
  source_hash = excluded.source_hash,
  success_stories_bottom_description = excluded.success_stories_bottom_description,
  post_created_at = excluded.post_created_at,
  post_updated_at = excluded.post_updated_at,
  content_created_at = excluded.content_created_at,
  content_updated_at = excluded.content_updated_at,
  updated_at = excluded.updated_at;

COMMIT;

-- Optional verification queries (run manually after migration):
-- SELECT COUNT(*) AS old_posts FROM posts;
-- SELECT COUNT(*) AS old_post_content_rows FROM post_content;
-- SELECT COUNT(*) AS new_rows FROM unified_posts;
-- SELECT COUNT(DISTINCT source_post_id) AS new_distinct_posts FROM unified_posts;
