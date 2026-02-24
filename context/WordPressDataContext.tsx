"use client";

import { createContext, useContext, useState, useEffect, useCallback, useRef, ReactNode } from "react";
import { useLanguage } from "./LanguageContext";

type ContentListType = 'podcasts' | 'blogPosts' | 'newsStories' | 'successStories';

const API_TYPE: Record<ContentListType, string> = {
  podcasts: 'podcast',
  blogPosts: 'blog',
  newsStories: 'press',
  successStories: 'success_story',
};

interface WordPressPost {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  content?: { rendered: string };
  date: string;
  slug: string;
  featured_media_url?: string;
  success_stories_bottom_description?: string;
  yoast_head_json?: {
    og_image?: Array<{ url: string }>;
    description?: string;
  };
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
    }>;
  };
}

interface WordPressData {
  podcasts: WordPressPost[];
  blogPosts: WordPressPost[];
  newsStories: WordPressPost[];
  successStories: WordPressPost[];
  loading: {
    podcasts: boolean;
    blogPosts: boolean;
    newsStories: boolean;
    successStories: boolean;
  };
  error: Error | null;
}

interface WordPressDataContextType extends WordPressData {
  refreshData: () => Promise<void>;
  ensureListDataLoaded: (type: 'podcasts' | 'blogPosts' | 'newsStories' | 'successStories') => Promise<void>;
  fetchFirstSuccessStories: (limit?: number) => Promise<WordPressPost[]>;
  fetchFirstBlogPosts: (limit?: number) => Promise<WordPressPost[]>;
  fetchFirstNewsStories: (limit?: number) => Promise<WordPressPost[]>;
  fetchFirstPodcasts: (limit?: number) => Promise<WordPressPost[]>;
  getPodcastBySlug: (slug: string) => WordPressPost | null;
  getBlogPostBySlug: (slug: string) => WordPressPost | null;
  getNewsStoryBySlug: (slug: string) => WordPressPost | null;
  getSuccessStoryBySlug: (slug: string) => WordPressPost | null;
  fetchPodcastBySlug: (slug: string) => Promise<WordPressPost | null>;
  fetchBlogPostBySlug: (slug: string) => Promise<WordPressPost | null>;
  fetchNewsStoryBySlug: (slug: string) => Promise<WordPressPost | null>;
  fetchSuccessStoryBySlug: (slug: string) => Promise<WordPressPost | null>;
}

const WordPressDataContext = createContext<WordPressDataContextType | undefined>(undefined);

// Fetch list data from the Neon-backed content API
async function fetchAllFromContent(type: ContentListType, language: string = 'en'): Promise<WordPressPost[]> {
  try {
    const response = await fetch(`/api/content?type=${API_TYPE[type]}&language=${language}`);
    if (!response.ok) return [];
    const data = await response.json();
    return data.posts || [];
  } catch (error) {
    console.error(`Error fetching content for ${type}:`, error);
    return [];
  }
}

// Fetch first N items quickly (for progressive loading)
async function fetchFirstN(type: ContentListType, language: string = 'en', limit: number = 3): Promise<WordPressPost[]> {
  try {
    const response = await fetch(`/api/content?type=${API_TYPE[type]}&limit=${limit}&language=${language}`);
    if (!response.ok) return [];
    const data = await response.json();
    return data.posts || [];
  } catch (error) {
    console.error(`Error fetching first ${limit} items for ${type}:`, error);
    return [];
  }
}

export function WordPressDataProvider({ children }: { children: ReactNode }) {
  const { language } = useLanguage();
  const [data, setData] = useState<WordPressData>({
    podcasts: [],
    blogPosts: [],
    newsStories: [],
    successStories: [],
    loading: {
      podcasts: false,
      blogPosts: false,
      newsStories: false,
      successStories: false,
    },
    error: null,
  });

  const fetchAllData = useCallback(async () => {
    try {
      setData(prev => ({ 
        ...prev, 
        loading: {
          podcasts: true,
          blogPosts: true,
          newsStories: true,
          successStories: true,
        },
        error: null 
      }));

      // Fetch all endpoints in parallel for efficiency
      const [podcasts, blogPosts, newsStories, successStories] = await Promise.all([
        fetchAllFromContent('podcasts', language),
        fetchAllFromContent('blogPosts', language),
        fetchAllFromContent('newsStories', language),
        fetchAllFromContent('successStories', language),
      ]);

      setData({
        podcasts: podcasts || [],
        blogPosts: blogPosts || [],
        newsStories: newsStories || [],
        successStories: successStories || [],
        loading: {
          podcasts: false,
          blogPosts: false,
          newsStories: false,
          successStories: false,
        },
        error: null,
      });
    } catch (error) {
      console.error('Error fetching WordPress data:', error);
      setData(prev => ({
        ...prev,
        loading: {
          podcasts: false,
          blogPosts: false,
          newsStories: false,
          successStories: false,
        },
        error: error instanceof Error ? error : new Error('Failed to fetch WordPress data'),
      }));
    }
  }, [language]);

  // Track which data types have been loaded (using ref to avoid re-renders)
  const loadedTypesRef = useRef<Set<string>>(new Set());

  // Clear loaded markers when language changes so we refetch localized data
  useEffect(() => {
    loadedTypesRef.current.clear();
    setData(prev => ({
      ...prev,
      podcasts: [],
      blogPosts: [],
      newsStories: [],
      successStories: [],
    }));
  }, [language]);

  // Fetch remaining pages starting from a specific page (for progressive loading)
  async function fetchRemainingPages(listType: ContentListType, startPage: number = 2): Promise<WordPressPost[]> {
    // With Neon content we fetch full list at once, so just reuse fetchAllFromContent
    return fetchAllFromContent(listType, language);
  }

  // Only fetch list data when needed (lazy loading)
  // Don't fetch on mount - let components request what they need
  const ensureListDataLoaded = useCallback(async (type: 'podcasts' | 'blogPosts' | 'newsStories' | 'successStories') => {
    if (loadedTypesRef.current.has(type)) {
      return; // Already loaded
    }

    try {
      // Set loading for this specific type
      setData(prev => ({ 
        ...prev, 
        loading: { ...prev.loading, [type]: true } 
      }));

      let items: WordPressPost[] = [];
      switch (type) {
        case 'podcasts':
          items = await fetchAllFromContent('podcasts', language);
          setData(prev => ({ 
            ...prev, 
            podcasts: items, 
            loading: { ...prev.loading, podcasts: false } 
          }));
          break;
        case 'blogPosts':
          items = await fetchAllFromContent('blogPosts', language);
          setData(prev => ({ 
            ...prev, 
            blogPosts: items, 
            loading: { ...prev.loading, blogPosts: false } 
          }));
          break;
        case 'newsStories':
          items = await fetchAllFromContent('newsStories', language);
          setData(prev => ({ 
            ...prev, 
            newsStories: items, 
            loading: { ...prev.loading, newsStories: false } 
          }));
          break;
        case 'successStories':
          items = await fetchAllFromContent('successStories', language);
          setData(prev => ({ 
            ...prev, 
            successStories: items, 
            loading: { ...prev.loading, successStories: false } 
          }));
          break;
      }

      loadedTypesRef.current.add(type);
    } catch (error) {
      console.error(`Error fetching ${type}:`, error);
      setData(prev => ({
        ...prev,
        loading: { ...prev.loading, [type]: false },
        error: error instanceof Error ? error : new Error(`Failed to fetch ${type}`),
      }));
    }
  }, [language]);

  // Generic helper to fetch first N items and update cache
  const fetchFirstItems = useCallback(async (
    listType: ContentListType,
    type: 'podcasts' | 'blogPosts' | 'newsStories' | 'successStories',
    limit: number
  ): Promise<WordPressPost[]> => {
    try {
      let items: WordPressPost[] = [];
      items = await fetchFirstN(listType, language, limit);
      
      // Update the cache with these items
      if (items.length > 0) {
        setData(prev => {
          const existing = prev[type];
          const existingIds = new Set(existing.map(item => item.id));
          const newItems = items.filter(item => !existingIds.has(item.id));
          
          if (newItems.length > 0) {
            return {
              ...prev,
              [type]: [...items, ...existing.filter(item => !items.find(i => i.id === item.id))],
            };
          } else if (items.length > 0 && existing.length === 0) {
            return {
              ...prev,
              [type]: items,
            };
          }
          return prev;
        });
      }
      
      return items;
    } catch (error) {
      console.error(`Error fetching first ${type}:`, error);
      return [];
    }
  }, [language]);

  // Fetch first N success stories quickly (for progressive loading)
  const fetchFirstSuccessStories = useCallback(async (limit: number = 3): Promise<WordPressPost[]> => {
    return fetchFirstItems('successStories', 'successStories', limit);
  }, [fetchFirstItems]);

  // Fetch first N blog posts quickly (for progressive loading)
  const fetchFirstBlogPosts = useCallback(async (limit: number = 12): Promise<WordPressPost[]> => {
    return fetchFirstItems('blogPosts', 'blogPosts', limit);
  }, [fetchFirstItems]);

  // Fetch first N news stories quickly (for progressive loading)
  const fetchFirstNewsStories = useCallback(async (limit: number = 12): Promise<WordPressPost[]> => {
    return fetchFirstItems('newsStories', 'newsStories', limit);
  }, [fetchFirstItems]);

  // Fetch first N podcasts quickly (for progressive loading)
  const fetchFirstPodcasts = useCallback(async (limit: number = 6): Promise<WordPressPost[]> => {
    return fetchFirstItems('podcasts', 'podcasts', limit);
  }, [fetchFirstItems]);

  const getCachedItem = useCallback((type: 'podcasts' | 'blogPosts' | 'newsStories' | 'successStories', slug: string): WordPressPost | null => {
    const list = data[type];
    return list.find(p => p.slug === slug) || null;
  }, [data]);

  // Fetch a single item by slug (for slug pages)
  const fetchSingleItem = useCallback(async (
    listType: ContentListType,
    slug: string,
    type: 'podcasts' | 'blogPosts' | 'newsStories' | 'successStories'
  ): Promise<WordPressPost | null> => {
    try {
      // First check if we already have it in cache
      const cached = getCachedItem(type, slug);
      if (cached) {
        return cached;
      }

      const response = await fetch(`/api/content?type=${API_TYPE[listType]}&slug=${slug}&language=${language}`);
      if (!response.ok) return null;
      const data = await response.json();
      const item = data.post || null;

      if (item) {
        // Add to cache
        setData(prev => {
          const currentList = prev[type];
          if (!currentList.find(p => p.id === item.id)) {
            return {
              ...prev,
              [type]: [...currentList, item],
            };
          }
          return prev;
        });
      }

      return item;
    } catch (error) {
      console.error(`Error fetching ${type} by slug:`, error);
      return null;
    }
  }, [getCachedItem, language]);

  const refreshData = useCallback(async () => {
    await fetchAllData();
  }, [fetchAllData]);

  const getPodcastBySlug = useCallback((slug: string): WordPressPost | null => {
    return getCachedItem('podcasts', slug);
  }, [getCachedItem]);

  const getBlogPostBySlug = useCallback((slug: string): WordPressPost | null => {
    return getCachedItem('blogPosts', slug);
  }, [getCachedItem]);

  const getNewsStoryBySlug = useCallback((slug: string): WordPressPost | null => {
    return getCachedItem('newsStories', slug);
  }, [getCachedItem]);

  const getSuccessStoryBySlug = useCallback((slug: string): WordPressPost | null => {
    return getCachedItem('successStories', slug);
  }, [getCachedItem]);

  const fetchPodcastBySlug = useCallback(async (slug: string): Promise<WordPressPost | null> => {
    return fetchSingleItem('podcasts', slug, 'podcasts');
  }, [fetchSingleItem]);

  const fetchBlogPostBySlug = useCallback(async (slug: string): Promise<WordPressPost | null> => {
    return fetchSingleItem('blogPosts', slug, 'blogPosts');
  }, [fetchSingleItem]);

  const fetchNewsStoryBySlug = useCallback(async (slug: string): Promise<WordPressPost | null> => {
    return fetchSingleItem('newsStories', slug, 'newsStories');
  }, [fetchSingleItem]);

  const fetchSuccessStoryBySlug = useCallback(async (slug: string): Promise<WordPressPost | null> => {
    return await fetchSingleItem('successStories', slug, 'successStories');
  }, [fetchSingleItem]);

  return (
    <WordPressDataContext.Provider value={{ 
      ...data, 
      refreshData,
      ensureListDataLoaded,
      fetchFirstSuccessStories,
      fetchFirstBlogPosts,
      fetchFirstNewsStories,
      fetchFirstPodcasts,
      getPodcastBySlug,
      getBlogPostBySlug,
      getNewsStoryBySlug,
      getSuccessStoryBySlug,
      fetchPodcastBySlug,
      fetchBlogPostBySlug,
      fetchNewsStoryBySlug,
      fetchSuccessStoryBySlug,
    }}>
      {children}
    </WordPressDataContext.Provider>
  );
}

export function useWordPressData(): WordPressDataContextType {
  const context = useContext(WordPressDataContext);
  if (!context) {
    throw new Error('useWordPressData must be used within a WordPressDataProvider');
  }
  return context;
}

