-- Turso (SQLite) schema for SportEndorse.
-- Unified table is the primary runtime model.
-- Legacy tables are kept for migration/backfill compatibility.

-- Legacy compatibility table
CREATE TABLE IF NOT EXISTS posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL,
  type TEXT NOT NULL,
  wordpress_id INTEGER UNIQUE,
  featured_image_url TEXT,
  yoast_og_image TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  published_at DATETIME,
  is_new INTEGER DEFAULT 0  -- SQLite uses INTEGER for BOOLEAN
);

-- Legacy compatibility table
CREATE TABLE IF NOT EXISTS post_content (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  post_id INTEGER NOT NULL,
  language TEXT NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT,
  description TEXT,
  source_hash TEXT,  -- For translation/content hashing
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  success_stories_bottom_description TEXT,
  FOREIGN KEY(post_id) REFERENCES posts(id),
  UNIQUE(post_id, language)
);

-- Create indices for performance (crucial for query speed)
CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug);
CREATE INDEX IF NOT EXISTS idx_posts_type ON posts(type);
CREATE INDEX IF NOT EXISTS idx_posts_type_slug ON posts(type, slug);
CREATE INDEX IF NOT EXISTS idx_posts_wordpress_id ON posts(wordpress_id);
CREATE INDEX IF NOT EXISTS idx_posts_published_at ON posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_updated_at ON posts(updated_at DESC);

CREATE INDEX IF NOT EXISTS idx_post_content_post_id ON post_content(post_id);
CREATE INDEX IF NOT EXISTS idx_post_content_language ON post_content(language);
CREATE INDEX IF NOT EXISTS idx_post_content_post_language ON post_content(post_id, language);
CREATE INDEX IF NOT EXISTS idx_post_content_source_hash ON post_content(source_hash);

-- New denormalized table to remove expensive joins at read time.
-- One row per (logical post, language).
CREATE TABLE IF NOT EXISTS unified_posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  source_post_id INTEGER NOT NULL,
  source_post_content_id INTEGER,
  language TEXT NOT NULL,
  slug TEXT NOT NULL,
  type TEXT NOT NULL,
  wordpress_id INTEGER,
  featured_image_url TEXT,
  yoast_og_image TEXT,
  published_at TEXT,
  is_new NUMERIC DEFAULT 0,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT,
  description TEXT,
  source_hash TEXT,
  success_stories_bottom_description TEXT,
  post_created_at TEXT,
  post_updated_at TEXT,
  content_created_at TEXT,
  content_updated_at TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(source_post_id, language)
);

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

-- Enable foreign keys (SQLite doesn't enforce them by default)
PRAGMA foreign_keys = ON;
