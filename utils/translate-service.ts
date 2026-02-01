import { translate } from 'google-translate-api-x';
import { sql } from '@vercel/postgres';
import crypto from 'crypto';

/**
 * Clean HTML content to protect code structure from translation
 * The free API can be aggressive and translate class names/IDs if we're not careful
 */
function cleanHtmlForTranslation(html: string): { cleaned: string; placeholders: Map<string, string> } {
  if (!html) return { cleaned: '', placeholders: new Map() };
  
  // Protect HTML attributes (class, id, data-*, etc.)
  // Replace attribute values with placeholders
  const attributePlaceholders: Map<string, string> = new Map();
  let placeholderIndex = 0;
  
  let cleanedHtml = html;
  
  // Protect script and style tags completely (do this first)
  cleanedHtml = cleanedHtml.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, (match) => {
    const placeholder = `__SCRIPT_${placeholderIndex}__`;
    attributePlaceholders.set(placeholder, match);
    placeholderIndex++;
    return placeholder;
  });
  
  cleanedHtml = cleanedHtml.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, (match) => {
    const placeholder = `__STYLE_${placeholderIndex}__`;
    attributePlaceholders.set(placeholder, match);
    placeholderIndex++;
    return placeholder;
  });
  
  // Protect class and id attributes (but be more careful - don't break the HTML)
  cleanedHtml = cleanedHtml.replace(/\s(class|id|data-[^=]*|href|src|alt|title|aria-[^=]*|role|type|name|for|value|placeholder)="([^"]*)"/gi, (match, attr, value) => {
    // Only protect if the value looks like it might be translated (contains letters)
    if (/[a-zA-Z]/.test(value) && !value.startsWith('http') && !value.startsWith('/')) {
      const placeholder = `__ATTR_${placeholderIndex}__`;
      attributePlaceholders.set(placeholder, match);
      placeholderIndex++;
      return ` ${attr}="${placeholder}"`;
    }
    return match;
  });
  
  return { cleaned: cleanedHtml, placeholders: attributePlaceholders };
}

/**
 * Restore HTML after translation
 */
function restoreHtmlAfterTranslation(
  translatedHtml: string,
  placeholders: Map<string, string>
): string {
  let restored = translatedHtml;
  
  // Restore placeholders
  placeholders.forEach((original, placeholder) => {
    restored = restored.replace(new RegExp(placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), original);
  });
  
  return restored;
}

/**
 * Generate a unique hash for the source content
 */
function generateSourceHash(text: string): string {
  return crypto.createHash('sha256').update(text).digest('hex');
}

/**
 * Generate a context key for WordPress content
 */
function generateContextKey(
  type: 'post' | 'podcast' | 'press' | 'success_story',
  slug: string,
  field: 'title' | 'excerpt' | 'content'
): string {
  return `${type}-${slug}-${field}`;
}

/**
 * Get translation from database cache
 */
async function getCachedTranslation(
  contextKey: string,
  language: 'es' | 'de' | 'fr',
  sourceHash: string
): Promise<string | null> {
  try {
    const result = await sql`
      SELECT translated_text, source_hash
      FROM translations
      WHERE context_key = ${contextKey}
        AND language = ${language}
        AND source_hash = ${sourceHash}
      LIMIT 1
    `;
    
    if (result.rows.length > 0) {
      // Verify hash matches (content hasn't changed)
      if (result.rows[0].source_hash === sourceHash) {
        return result.rows[0].translated_text;
      }
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching cached translation:', error);
    return null;
  }
}

/**
 * Batch get translations from database cache (more efficient than individual queries)
 * Uses individual queries since Vercel Postgres doesn't support sql.join
 */
async function getCachedTranslationsBatch(
  contextKeys: Array<{ key: string; hash: string }>,
  language: 'es' | 'de' | 'fr'
): Promise<Map<string, string>> {
  const cache = new Map<string, string>();
  
  if (contextKeys.length === 0) return cache;
  
  // Use Promise.all to fetch all translations in parallel
  // This is still more efficient than sequential queries
  try {
    const promises = contextKeys.map(({ key, hash }) => 
      getCachedTranslation(key, language, hash).then(cached => ({ key, cached }))
    );
    
    const results = await Promise.all(promises);
    
    results.forEach(({ key, cached }) => {
      if (cached) {
        cache.set(key, cached);
      }
    });
    
    return cache;
  } catch (error) {
    console.error('Error fetching batch cached translations:', error);
    // Return empty cache on error - translations will be fetched individually
    return cache;
  }
}

/**
 * Save translation to database cache
 */
async function saveTranslation(
  contextKey: string,
  language: 'es' | 'de' | 'fr',
  sourceHash: string,
  translatedText: string
): Promise<void> {
  try {
    await sql`
      INSERT INTO translations (context_key, language, source_hash, translated_text)
      VALUES (${contextKey}, ${language}, ${sourceHash}, ${translatedText})
      ON CONFLICT (context_key, language)
      DO UPDATE SET
        source_hash = ${sourceHash},
        translated_text = ${translatedText},
        created_at = NOW()
    `;
  } catch (error) {
    console.error('Error saving translation:', error);
    // Don't throw - caching failure shouldn't break the app
  }
}

/**
 * Translate text with caching
 */
export async function translateText(
  text: string,
  targetLanguage: 'es' | 'de' | 'fr',
  contextKey: string
): Promise<string> {
  if (!text || text.trim().length === 0) {
    return text;
  }
  
  // Generate hash of source content
  const sourceHash = generateSourceHash(text);
  
  // Check cache first
  const cached = await getCachedTranslation(contextKey, targetLanguage, sourceHash);
  if (cached) {
    return cached;
  }
  
  // Clean HTML if present
  const isHtml = text.includes('<');
  let cleanedText = text;
  let placeholders: Map<string, string> = new Map();
  
  if (isHtml) {
    const cleaned = cleanHtmlForTranslation(text);
    cleanedText = cleaned.cleaned;
    placeholders = cleaned.placeholders;
  }
  
  try {
    // Translate using free Google Translate API
    // Translate single text (not in batch) to avoid batch failures
    const result = await translate(cleanedText, {
      to: targetLanguage,
      from: 'en',
    });
    
    let translatedText = result.text;
    
    // Restore HTML if it was cleaned
    if (isHtml && placeholders.size > 0) {
      translatedText = restoreHtmlAfterTranslation(translatedText, placeholders);
    }
    
    // Save to cache
    await saveTranslation(contextKey, targetLanguage, sourceHash, translatedText);
    
    return translatedText;
  } catch (error) {
    console.error('Translation error:', error);
    // If it's a rate limit or temporary error, wait a bit and retry once
    if (error instanceof Error && (
      error.message.includes('rejected') || 
      error.message.includes('rate limit') ||
      error.message.includes('Partial Translation')
    )) {
      // Wait 1-2 seconds before retrying
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
      
      try {
        const retryResult = await translate(cleanedText, {
          to: targetLanguage,
          from: 'en',
        });
        
        let retryTranslatedText = retryResult.text;
        if (isHtml && placeholders.size > 0) {
          retryTranslatedText = restoreHtmlAfterTranslation(retryTranslatedText, placeholders);
        }
        
        await saveTranslation(contextKey, targetLanguage, sourceHash, retryTranslatedText);
        return retryTranslatedText;
      } catch (retryError) {
        console.error('Translation retry also failed:', retryError);
        // Return original text on error (graceful fallback)
        return text;
      }
    }
    
    // Return original text on error (graceful fallback)
    return text;
  }
}

/**
 * Translate WordPress post content
 */
export async function translateWordPressPost(
  post: {
    slug: string;
    title?: { rendered?: string };
    excerpt?: { rendered?: string };
    content?: { rendered?: string };
    yoast_head_json?: { description?: string };
    success_stories_bottom_description?: string;
  },
  postType: 'post' | 'podcast' | 'press' | 'success_story',
  targetLanguage: 'es' | 'de' | 'fr'
): Promise<{
  title: { rendered: string };
  excerpt: { rendered: string };
  content?: { rendered: string };
  yoast_head_json?: { description?: string };
  success_stories_bottom_description?: string;
}> {
  // Validate required fields with detailed error messages
  if (!post) {
    throw new Error('Post object is undefined');
  }
  
  if (!post.slug) {
    throw new Error('Post slug is missing');
  }
  
  if (!post.title) {
    throw new Error(`Post ${post.slug} is missing title object`);
  }
  
  if (!post.title.rendered) {
    throw new Error(`Post ${post.slug} is missing title.rendered`);
  }

  // Translate each field individually with error handling
  // This prevents one failure from affecting others
  const translateField = async (
    text: string,
    fieldName: string,
    contextKey: string
  ): Promise<string> => {
    if (!text || text.trim().length === 0) {
      return text || '';
    }
    try {
      return await translateText(
        text,
        targetLanguage,
        contextKey
      );
    } catch (error) {
      console.error(`Error translating ${fieldName} for ${post.slug}:`, error);
      // Return original text if translation fails
      return text;
    }
  };

  // Safely get title text with fallback
  const titleText = post.title?.rendered || '';
  if (!titleText) {
    throw new Error(`Post ${post.slug} has empty title.rendered`);
  }

  // Check cache for all fields first (batch lookup for efficiency)
  const titleKey = generateContextKey(postType, post.slug, 'title');
  const titleHash = generateSourceHash(titleText);
  const excerptKey = post.excerpt?.rendered ? generateContextKey(postType, post.slug, 'excerpt') : null;
  const excerptHash = post.excerpt?.rendered ? generateSourceHash(post.excerpt.rendered) : null;
  const contentKey = post.content?.rendered ? generateContextKey(postType, post.slug, 'content') : null;
  const contentHash = post.content?.rendered ? generateSourceHash(post.content.rendered) : null;
  
  const cacheKeys = [
    { key: titleKey, hash: titleHash },
    ...(excerptKey ? [{ key: excerptKey, hash: excerptHash! }] : []),
    ...(contentKey ? [{ key: contentKey, hash: contentHash! }] : []),
  ];
  
  const cachedTranslations = await getCachedTranslationsBatch(cacheKeys, targetLanguage);
  
  // Translate fields sequentially with reduced delays (only if not cached)
  // Reduced delay from 500ms to 300ms since we're checking cache first
  const translatedTitle = cachedTranslations.get(titleKey) || await translateField(
    titleText, 
    'title',
    titleKey
  );
  
  // Translate excerpt if it exists
  let translatedExcerpt: string;
  const excerptText = post.excerpt?.rendered;
  if (excerptText && excerptText.trim().length > 0) {
    const cachedExcerpt = cachedTranslations.get(excerptKey!);
    if (cachedExcerpt) {
      translatedExcerpt = cachedExcerpt;
    } else {
      await new Promise(resolve => setTimeout(resolve, 300));
      translatedExcerpt = await translateField(
        excerptText, 
        'excerpt',
        excerptKey!
      );
    }
  } else {
    // Use empty string as fallback if excerpt is missing
    translatedExcerpt = '';
  }
  
  // Only translate content if it exists
  let translatedContent: string | undefined;
  const contentText = post.content?.rendered;
  if (contentText && contentText.trim().length > 0) {
    const cachedContent = cachedTranslations.get(contentKey!);
    if (cachedContent) {
      translatedContent = cachedContent;
    } else {
      await new Promise(resolve => setTimeout(resolve, 300));
      translatedContent = await translateField(
        contentText, 
        'content',
        contentKey!
      );
    }
  }
  
  // For success stories, also translate special fields
  let translatedYoastDescription: string | undefined;
  let translatedBottomDescription: string | undefined;
  
  if (postType === 'success_story') {
    // Translate yoast_head_json.description if it exists
    const yoastDescription = post.yoast_head_json?.description;
    if (yoastDescription && yoastDescription.trim().length > 0) {
      await new Promise(resolve => setTimeout(resolve, 300));
      translatedYoastDescription = await translateField(
        yoastDescription, 
        'yoast_description',
        `${postType}-${post.slug}-yoast-description`
      );
    }
    
    // Translate success_stories_bottom_description if it exists
    const bottomDescription = post.success_stories_bottom_description;
    if (bottomDescription && bottomDescription.trim().length > 0) {
      await new Promise(resolve => setTimeout(resolve, 300));
      translatedBottomDescription = await translateField(
        bottomDescription, 
        'bottom_description',
        `${postType}-${post.slug}-bottom-description`
      );
    }
  }
  
  return {
    title: { rendered: translatedTitle },
    excerpt: { rendered: translatedExcerpt },
    ...(translatedContent && { content: { rendered: translatedContent } }),
    ...(translatedYoastDescription && { 
      yoast_head_json: { description: translatedYoastDescription } 
    }),
    ...(translatedBottomDescription && { 
      success_stories_bottom_description: translatedBottomDescription 
    }),
  };
}

