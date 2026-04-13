import { useState, useCallback } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { getCachedTranslation, saveCachedTranslation } from '@/utils/translation-cache';

interface TranslatePostParams {
  slug: string;
  title: { rendered: string };
  excerpt?: { rendered: string };
  content?: { rendered: string };
  yoast_head_json?: { description?: string };
  success_stories_bottom_description?: string;
}

interface TranslatedPost {
  title: { rendered: string };
  excerpt: { rendered: string };
  content?: { rendered: string };
  yoast_head_json?: { description?: string };
  success_stories_bottom_description?: string;
}

/**
 * Hook to get translated WordPress posts
 * NOTE: Since translations are already in the database, this hook now:
 * 1. Returns original post for English (no translation needed)
 * 2. For other languages, the original post is already pre-translated in the database
 *    - Just return the original post which has translations from post_content table
 */
export function useTranslation() {
  const { language } = useLanguage();
  const [translating, setTranslating] = useState(false);

  const translatePost = useCallback(
    async (
      post: TranslatePostParams,
      postType: 'post' | 'podcast' | 'press' | 'success_story'
    ): Promise<TranslatedPost | null> => {
      // For all languages, return the original post directly
      // The post has been fetched from the database with the correct language already
      return {
        title: post.title,
        excerpt: post.excerpt || { rendered: '' },
        ...(post.content && { content: post.content }),
        ...(post.yoast_head_json && { yoast_head_json: post.yoast_head_json }),
        ...(post.success_stories_bottom_description && { 
          success_stories_bottom_description: post.success_stories_bottom_description 
        }),
      };
    },
    [language]
  );

  const translatePosts = useCallback(
    (
      posts: TranslatePostParams[],
      postType: 'post' | 'podcast' | 'press' | 'success_story'
    ): Promise<TranslatedPost[]> => {
      // Posts are already in the correct language from the database.
      // No translation needed - just return them as-is.
      return Promise.resolve(
        posts.map(post => ({
          title: post.title,
          excerpt: post.excerpt || { rendered: '' },
          ...(post.content && { content: post.content }),
          ...(post.success_stories_bottom_description && { 
            success_stories_bottom_description: post.success_stories_bottom_description 
          }),
        }))
      );
    },
    []
  );

  return { translatePost, translatePosts, translating, language };
}

