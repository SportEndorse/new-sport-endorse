"use client";

import { createContext, useContext, useState, useEffect, useCallback, useRef, ReactNode } from "react";

const WORDPRESS_API_URL = 'https://www.sportendorse.com/wp-json/wp/v2';

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

// Helper function to fetch all pages from a WordPress endpoint
async function fetchAllPages(endpoint: string): Promise<WordPressPost[]> {
  let allItems: WordPressPost[] = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    try {
      const response = await fetch(`${WORDPRESS_API_URL}${endpoint}${endpoint.includes('?') ? '&' : '?'}_embed&page=${page}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        // Cache for 24 hours - but we'll only fetch once per session
        cache: 'force-cache',
      });

      if (!response.ok) {
        if (response.status === 404) {
          hasMore = false;
          break;
        }
        console.warn(`Failed to fetch ${endpoint} page ${page}: ${response.status}`);
        break;
      }

      const items = await response.json();

      if (!items || items.length === 0) {
        hasMore = false;
        break;
      }

      allItems = allItems.concat(items);
      page++;

      // Check if there are more pages
      const totalPages = response.headers.get('X-WP-TotalPages');
      if (totalPages && page > parseInt(totalPages)) {
        hasMore = false;
      }
    } catch (error) {
      console.error(`Error fetching ${endpoint} page ${page}:`, error);
      break;
    }
  }

  return allItems;
}

// Fetch first N items quickly (for progressive loading)
async function fetchFirstNPages(endpoint: string, limit: number = 3): Promise<WordPressPost[]> {
  try {
    const response = await fetch(`${WORDPRESS_API_URL}${endpoint}${endpoint.includes('?') ? '&' : '?'}_embed&per_page=${limit}&page=1`, {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'force-cache',
    });

    if (!response.ok) {
      return [];
    }

    const items = await response.json();
    return items || [];
  } catch (error) {
    console.error(`Error fetching first ${limit} items from ${endpoint}:`, error);
    return [];
  }
}

export function WordPressDataProvider({ children }: { children: ReactNode }) {
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

  const fetchAllData = async () => {
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
        fetchAllPages('/podcasts'),
        fetchAllPages('/posts'),
        fetchAllPages('/presses'),
        fetchAllPages('/success_stories'),
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
  };

  // Track which data types have been loaded (using ref to avoid re-renders)
  const loadedTypesRef = useRef<Set<string>>(new Set());

  // Fetch remaining pages starting from a specific page (for progressive loading)
  async function fetchRemainingPages(endpoint: string, startPage: number = 2): Promise<WordPressPost[]> {
    let allItems: WordPressPost[] = [];
    let page = startPage;
    let hasMore = true;

    while (hasMore) {
      try {
        const response = await fetch(`${WORDPRESS_API_URL}${endpoint}${endpoint.includes('?') ? '&' : '?'}_embed&page=${page}`, {
          headers: {
            'Content-Type': 'application/json',
          },
          cache: 'force-cache',
        });

        if (!response.ok) {
          if (response.status === 404) {
            hasMore = false;
            break;
          }
          console.warn(`Failed to fetch ${endpoint} page ${page}: ${response.status}`);
          break;
        }

        const items = await response.json();

        if (!items || items.length === 0) {
          hasMore = false;
          break;
        }

        allItems = allItems.concat(items);
        page++;

        const totalPages = response.headers.get('X-WP-TotalPages');
        if (totalPages && page > parseInt(totalPages)) {
          hasMore = false;
        }
      } catch (error) {
        console.error(`Error fetching ${endpoint} page ${page}:`, error);
        break;
      }
    }

    return allItems;
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
          const existingPodcasts = data.podcasts;
          if (existingPodcasts.length > 0) {
            const remainingPodcasts = await fetchRemainingPages('/podcasts', 2);
            items = [...existingPodcasts, ...remainingPodcasts];
          } else {
            items = await fetchAllPages('/podcasts');
          }
          setData(prev => ({ 
            ...prev, 
            podcasts: items, 
            loading: { ...prev.loading, podcasts: false } 
          }));
          break;
        case 'blogPosts':
          const existingBlogPosts = data.blogPosts;
          if (existingBlogPosts.length > 0) {
            const remainingBlogPosts = await fetchRemainingPages('/posts', 2);
            items = [...existingBlogPosts, ...remainingBlogPosts];
          } else {
            items = await fetchAllPages('/posts');
          }
          setData(prev => ({ 
            ...prev, 
            blogPosts: items, 
            loading: { ...prev.loading, blogPosts: false } 
          }));
          break;
        case 'newsStories':
          const existingNewsStories = data.newsStories;
          if (existingNewsStories.length > 0) {
            const remainingNewsStories = await fetchRemainingPages('/presses', 2);
            items = [...existingNewsStories, ...remainingNewsStories];
          } else {
            items = await fetchAllPages('/presses');
          }
          setData(prev => ({ 
            ...prev, 
            newsStories: items, 
            loading: { ...prev.loading, newsStories: false } 
          }));
          break;
        case 'successStories':
          // Check if we already have some items cached (from progressive loading)
          const existing = data.successStories;
          if (existing.length > 0) {
            // We already have page 1, so fetch remaining pages starting from page 2
            const remainingItems = await fetchRemainingPages('/success_stories', 2);
            items = [...existing, ...remainingItems];
          } else {
            // No cached items, fetch all pages from the beginning
            items = await fetchAllPages('/success_stories');
          }
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
  }, [data.successStories, data.podcasts, data.blogPosts, data.newsStories]);

  // Generic helper to fetch first N items and update cache
  const fetchFirstItems = useCallback(async (
    endpoint: string,
    type: 'podcasts' | 'blogPosts' | 'newsStories' | 'successStories',
    limit: number
  ): Promise<WordPressPost[]> => {
    try {
      let items: WordPressPost[] = [];
      
      if (type === 'successStories') {
      items = await fetchFirstNPages('/success_stories', limit);
      } else {
        items = await fetchFirstNPages(endpoint, limit);
      }
      
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
  }, []);

  // Fetch first N success stories quickly (for progressive loading)
  const fetchFirstSuccessStories = useCallback(async (limit: number = 3): Promise<WordPressPost[]> => {
    return fetchFirstItems('/success_stories', 'successStories', limit);
  }, [fetchFirstItems]);

  // Fetch first N blog posts quickly (for progressive loading)
  const fetchFirstBlogPosts = useCallback(async (limit: number = 12): Promise<WordPressPost[]> => {
    return fetchFirstItems('/posts', 'blogPosts', limit);
  }, [fetchFirstItems]);

  // Fetch first N news stories quickly (for progressive loading)
  const fetchFirstNewsStories = useCallback(async (limit: number = 12): Promise<WordPressPost[]> => {
    return fetchFirstItems('/presses', 'newsStories', limit);
  }, [fetchFirstItems]);

  // Fetch first N podcasts quickly (for progressive loading)
  const fetchFirstPodcasts = useCallback(async (limit: number = 6): Promise<WordPressPost[]> => {
    return fetchFirstItems('/podcasts', 'podcasts', limit);
  }, [fetchFirstItems]);

  const getCachedItem = useCallback((type: 'podcasts' | 'blogPosts' | 'newsStories' | 'successStories', slug: string): WordPressPost | null => {
    const list = data[type];
    return list.find(p => p.slug === slug) || null;
  }, [data]);

  // Fetch a single item by slug (for slug pages)
  const fetchSingleItem = useCallback(async (
    endpoint: string,
    slug: string,
    type: 'podcasts' | 'blogPosts' | 'newsStories' | 'successStories'
  ): Promise<WordPressPost | null> => {
    try {
      // First check if we already have it in cache
      const cached = getCachedItem(type, slug);
      if (cached) {
        return cached;
      }

      // Fetch just this one item
      const response = await fetch(
        `${WORDPRESS_API_URL}${endpoint}?slug=${slug}&_embed`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          cache: 'force-cache',
        }
      );

      if (!response.ok) {
        return null;
      }

      const items = await response.json();
      const item = items[0] || null;

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
  }, [getCachedItem]);

  const refreshData = useCallback(async () => {
    await fetchAllData();
  }, []);

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
    return fetchSingleItem('/podcasts', slug, 'podcasts');
  }, [fetchSingleItem]);

  const fetchBlogPostBySlug = useCallback(async (slug: string): Promise<WordPressPost | null> => {
    return fetchSingleItem('/posts', slug, 'blogPosts');
  }, [fetchSingleItem]);

  const fetchNewsStoryBySlug = useCallback(async (slug: string): Promise<WordPressPost | null> => {
    return fetchSingleItem('/presses', slug, 'newsStories');
  }, [fetchSingleItem]);

  const fetchSuccessStoryBySlug = useCallback(async (slug: string): Promise<WordPressPost | null> => {
    return await fetchSingleItem('/success_stories', slug, 'successStories');
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

