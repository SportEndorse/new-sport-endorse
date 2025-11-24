/**
 * Client-side translation cache using localStorage
 * Reduces API calls and function invocations by caching translations locally
 */

const CACHE_PREFIX = 'translation_cache_';
const CACHE_VERSION = '1.0';
const MAX_CACHE_AGE = 7 * 24 * 60 * 60 * 1000; // 7 days

interface CachedTranslation {
  translated: any;
  timestamp: number;
  version: string;
}

/**
 * Generate cache key for a post
 */
function getCacheKey(
  postType: 'post' | 'podcast' | 'press' | 'success_story',
  slug: string,
  language: 'es' | 'de',
  contentHash: string
): string {
  return `${CACHE_PREFIX}${postType}_${slug}_${language}_${contentHash}`;
}

/**
 * Generate hash of post content for cache invalidation
 * Uses a simple hash function that works with Unicode characters
 */
function hashPostContent(post: {
  title?: { rendered?: string };
  excerpt?: { rendered?: string };
  content?: { rendered?: string };
  yoast_head_json?: { description?: string };
  success_stories_bottom_description?: string;
}): string {
  const parts = [
    post.title?.rendered || '',
    post.excerpt?.rendered || '',
    post.content?.rendered || '',
    post.yoast_head_json?.description || '',
    post.success_stories_bottom_description || '',
  ];
  
  const content = parts.join('|');
  
  // Simple hash function that works with Unicode
  // Convert string to hash using a simple algorithm
  let hash = 0;
  for (let i = 0; i < content.length; i++) {
    const char = content.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  
  // Convert to base36 string (alphanumeric) and take first 16 chars
  return Math.abs(hash).toString(36).slice(0, 16);
}

/**
 * Get cached translation from localStorage
 */
export function getCachedTranslation(
  post: {
    slug: string;
    title?: { rendered?: string };
    excerpt?: { rendered?: string };
    content?: { rendered?: string };
    yoast_head_json?: { description?: string };
    success_stories_bottom_description?: string;
  },
  postType: 'post' | 'podcast' | 'press' | 'success_story',
  language: 'es' | 'de'
): any | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const contentHash = hashPostContent(post);
    const cacheKey = getCacheKey(postType, post.slug, language, contentHash);
    const cached = localStorage.getItem(cacheKey);
    
    if (!cached) return null;
    
    const parsed: CachedTranslation = JSON.parse(cached);
    
    // Check version and age
    if (parsed.version !== CACHE_VERSION) {
      localStorage.removeItem(cacheKey);
      return null;
    }
    
    const age = Date.now() - parsed.timestamp;
    if (age > MAX_CACHE_AGE) {
      localStorage.removeItem(cacheKey);
      return null;
    }
    
    return parsed.translated;
  } catch (error) {
    console.error('Error reading translation cache:', error);
    return null;
  }
}

/**
 * Save translation to localStorage cache
 */
export function saveCachedTranslation(
  post: {
    slug: string;
    title?: { rendered?: string };
    excerpt?: { rendered?: string };
    content?: { rendered?: string };
    yoast_head_json?: { description?: string };
    success_stories_bottom_description?: string;
  },
  postType: 'post' | 'podcast' | 'press' | 'success_story',
  language: 'es' | 'de',
  translated: any
): void {
  if (typeof window === 'undefined') return;
  
  try {
    const contentHash = hashPostContent(post);
    const cacheKey = getCacheKey(postType, post.slug, language, contentHash);
    const cached: CachedTranslation = {
      translated,
      timestamp: Date.now(),
      version: CACHE_VERSION,
    };
    
    localStorage.setItem(cacheKey, JSON.stringify(cached));
    
    // Clean up old cache entries (keep last 100)
    cleanupOldCache();
  } catch (error) {
    // Handle quota exceeded or other storage errors gracefully
    if (error instanceof DOMException && error.name === 'QuotaExceededError') {
      // Clear old cache and try again
      cleanupOldCache(true);
      try {
        const contentHash = hashPostContent(post);
        const cacheKey = getCacheKey(postType, post.slug, language, contentHash);
        const cached: CachedTranslation = {
          translated,
          timestamp: Date.now(),
          version: CACHE_VERSION,
        };
        localStorage.setItem(cacheKey, JSON.stringify(cached));
      } catch (retryError) {
        console.warn('Could not save translation to cache:', retryError);
      }
    } else {
      console.error('Error saving translation cache:', error);
    }
  }
}

/**
 * Clean up old cache entries
 */
function cleanupOldCache(aggressive = false): void {
  try {
    const keys: Array<{ key: string; timestamp: number }> = [];
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith(CACHE_PREFIX)) {
        try {
          const cached = localStorage.getItem(key);
          if (cached) {
            const parsed: CachedTranslation = JSON.parse(cached);
            keys.push({ key, timestamp: parsed.timestamp });
          }
        } catch {
          // Invalid entry, remove it
          if (key) localStorage.removeItem(key);
        }
      }
    }
    
    // Sort by timestamp (oldest first)
    keys.sort((a, b) => a.timestamp - b.timestamp);
    
    // Remove oldest entries if we have more than 100 (or 50 if aggressive)
    const maxEntries = aggressive ? 50 : 100;
    if (keys.length > maxEntries) {
      const toRemove = keys.slice(0, keys.length - maxEntries);
      toRemove.forEach(({ key }) => localStorage.removeItem(key));
    }
  } catch (error) {
    console.error('Error cleaning up cache:', error);
  }
}

/**
 * Clear all translation cache
 */
export function clearTranslationCache(): void {
  if (typeof window === 'undefined') return;
  
  try {
    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith(CACHE_PREFIX)) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach(key => localStorage.removeItem(key));
  } catch (error) {
    console.error('Error clearing translation cache:', error);
  }
}

