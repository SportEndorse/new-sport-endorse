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
 * Hook to translate WordPress posts
 * Uses client-side cache first, then API route with Postgres caching
 */
export function useTranslation() {
  const { language } = useLanguage();
  const [translating, setTranslating] = useState(false);

  const translatePost = useCallback(
    async (
      post: TranslatePostParams,
      postType: 'post' | 'podcast' | 'press' | 'success_story'
    ): Promise<TranslatedPost | null> => {
      // No translation needed for English
      if (language === 'en') {
        return {
          title: post.title,
          excerpt: post.excerpt || { rendered: '' },
          ...(post.content && { content: post.content }),
        };
      }

      // Check client-side cache first (avoids API call)
      const cached = getCachedTranslation(post, postType, language);
      if (cached) {
        return cached;
      }

      setTranslating(true);
      try {
        const response = await fetch('/api/translate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            post,
            postType,
            language,
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error('Translation failed:', errorText);
          // Return original post on error (graceful fallback)
          return {
            title: post.title,
            excerpt: post.excerpt || { rendered: '' },
            ...(post.content && { content: post.content }),
          };
        }

        const data = await response.json();
        const translated = data.translated;
        
        // Cache the translation client-side
        if (translated) {
          saveCachedTranslation(post, postType, language, translated);
        }
        
        return translated;
      } catch (error) {
        console.error('Translation error:', error);
        // Return original post on error (graceful fallback)
        return {
          title: post.title,
          excerpt: post.excerpt || { rendered: '' },
          ...(post.content && { content: post.content }),
        };
      } finally {
        setTranslating(false);
      }
    },
    [language]
  );

  const translatePosts = useCallback(
    async (
      posts: TranslatePostParams[],
      postType: 'post' | 'podcast' | 'press' | 'success_story'
    ): Promise<TranslatedPost[]> => {
      // No translation needed for English
      if (language === 'en') {
        return posts.map(post => ({
          title: post.title,
          excerpt: post.excerpt || { rendered: '' },
          ...(post.content && { content: post.content }),
        }));
      }

      // Check client-side cache first for all posts
      const cachedResults: Array<TranslatedPost | null> = [];
      const postsToTranslate: Array<{ post: TranslatePostParams; index: number }> = [];
      
      posts.forEach((post, index) => {
        const cached = getCachedTranslation(post, postType, language);
        if (cached) {
          cachedResults[index] = cached;
        } else {
          postsToTranslate.push({ post, index });
        }
      });

      // If all posts are cached, return immediately (no API call!)
      if (postsToTranslate.length === 0) {
        return cachedResults.filter((result): result is TranslatedPost => result !== null);
      }

      setTranslating(true);
      try {
        // Batch translate remaining posts in a single API call
        const response = await fetch('/api/translate/batch', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            posts: postsToTranslate.map(({ post }) => post),
            postType,
            language,
          }),
        });

        if (!response.ok) {
          console.error('Batch translation failed');
          // Fill in missing translations with originals
          postsToTranslate.forEach(({ post, index }) => {
            cachedResults[index] = {
              title: post.title,
              excerpt: post.excerpt || { rendered: '' },
              ...(post.content && { content: post.content }),
            };
          });
          return cachedResults.filter((result): result is TranslatedPost => result !== null);
        }

        const data = await response.json();
        const translated = data.translated || [];
        
        // Merge cached and newly translated results
        translated.forEach((translatedPost: TranslatedPost, i: number) => {
          const { index } = postsToTranslate[i];
          cachedResults[index] = translatedPost;
          
          // Cache the translation client-side
          saveCachedTranslation(postsToTranslate[i].post, postType, language, translatedPost);
        });
        
        return cachedResults.filter((result): result is TranslatedPost => result !== null);
      } catch (error) {
        console.error('Batch translation error:', error);
        // Fill in missing translations with originals
        postsToTranslate.forEach(({ post, index }) => {
          cachedResults[index] = {
            title: post.title,
            excerpt: post.excerpt || { rendered: '' },
            ...(post.content && { content: post.content }),
          };
        });
        return cachedResults.filter((result): result is TranslatedPost => result !== null);
      } finally {
        setTranslating(false);
      }
    },
    [language]
  );

  return { translatePost, translatePosts, translating, language };
}

