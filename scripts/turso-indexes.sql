-- Optimize Turso database with essential indexes
-- These dramatically reduce query execution time and row reads

-- Index for querying posts by type (used in every list query)
CREATE INDEX IF NOT EXISTS idx_posts_type 
ON posts(type, published_at DESC, id DESC);

-- Index for querying posts by slug and type (used in single post pages)
CREATE INDEX IF NOT EXISTS idx_posts_slug_type 
ON posts(slug, type);

-- Index for querying posts by wordpress_id (used during sync)
CREATE INDEX IF NOT EXISTS idx_posts_wordpress_id 
ON posts(wordpress_id);

-- Index for post_content lookups by post_id and language (critical join column)
CREATE INDEX IF NOT EXISTS idx_post_content_post_language 
ON post_content(post_id, language);

-- Index for finding post_content by language (helps with translations)
CREATE INDEX IF NOT EXISTS idx_post_content_language 
ON post_content(language);

-- Index for sync queries (checking latest updates)
CREATE INDEX IF NOT EXISTS idx_posts_updated_at 
ON posts(updated_at DESC);

-- Index for finding posts by published date (sorting)
CREATE INDEX IF NOT EXISTS idx_posts_published_at 
ON posts(published_at DESC);

-- Unified table indexes (single-table read path)
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
