"use client";

import Link from "next/link";

import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useWordPressData } from "@/context/WordPressDataContext";
import { useTranslation } from "@/hooks/useTranslation";
import translations from "@/utils/translations";
import "../styles/blog.css";

// Function to decode HTML entities
function decodeHtmlEntities(text: string): string {
  if (!text) return text;
  
  const entities: Record<string, string> = {
    '&#038;': '&',
    '&#8217;': "'",
    '&#8216;': "'",
    '&#8220;': '"',
    '&#8221;': '"',
    '&#8211;': '–',
    '&#8212;': '—',
    '&amp;': '&',
    '&quot;': '"',
    '&apos;': "'",
    '&lt;': '<',
    '&gt;': '>',
    '&nbsp;': ' '
  };
  
  let decodedText = text;
  for (const [entity, replacement] of Object.entries(entities)) {
    decodedText = decodedText.replace(new RegExp(entity, 'g'), replacement);
  }
  return decodedText;
}

// Loading skeleton card component
function LoadingCard() {
  return (
    <article className="blog-post-card" style={{ opacity: 0.7 }}>
      <div style={{ 
        width: '100%', 
        height: '18rem', 
        background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.5s infinite',
      }} />
      <div className="blog-post-content">
        <div style={{ 
          height: '24px', 
          background: '#e0e0e0', 
          borderRadius: '4px', 
          marginBottom: '0.5rem',
          width: '85%'
        }} />
        <div style={{ 
          height: '16px', 
          background: '#e0e0e0', 
          borderRadius: '4px', 
          marginBottom: '0.25rem',
          width: '100%'
        }} />
        <div style={{ 
          height: '16px', 
          background: '#e0e0e0', 
          borderRadius: '4px', 
          marginBottom: '0.5rem',
          width: '70%'
        }} />
        <div style={{ 
          height: '14px', 
          background: '#e0e0e0', 
          borderRadius: '4px', 
          width: '120px',
          marginTop: '1rem'
        }} />
      </div>
    </article>
  );
}

export default function SuccessStoriesContent() {
  const { language } = useLanguage();
  const t = translations[language];
  const { successStories: stories, loading, ensureListDataLoaded, fetchFirstSuccessStories } = useWordPressData();
  const { translatePosts } = useTranslation();
  const isLoading = loading.successStories;
  const [visibleCount, setVisibleCount] = useState(12);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  const [translatedStories, setTranslatedStories] = useState<typeof stories>([]);
  const translatingRef = useRef(false);
  const lastTranslatedKeyRef = useRef<string>('');

  // Fetch first 12 success stories immediately, then load the rest
  useEffect(() => {
    let mounted = true;
    
    const loadProgressive = async () => {
      // First, fetch first 12 success stories quickly
      const firstStories = await fetchFirstSuccessStories(12);
      if (mounted && firstStories.length > 0) {
        setInitialLoadComplete(true);
      }
      
      // Then load all success stories in the background
      ensureListDataLoaded('successStories');
    };
    
    loadProgressive();
    
    return () => {
      mounted = false;
    };
  }, [fetchFirstSuccessStories, ensureListDataLoaded]);

  // Translate success stories when language changes or stories are loaded
  useEffect(() => {
    // Early return if no stories or English
    if (!stories || stories.length === 0 || language === 'en') {
      if (language === 'en') {
        setTranslatedStories([]);
        lastTranslatedKeyRef.current = '';
      }
      return;
    }
    
    // Create a unique key based on story slugs and language to prevent duplicate translations
    const storySlugs = stories
      .filter(s => s.slug && s.title?.rendered)
      .map(s => s.slug)
      .sort()
      .join(',');
    const translationKey = `${language}-${storySlugs}`;
    
    // Skip if already translating (check first to prevent race conditions)
    if (translatingRef.current) {
      return;
    }
    
    // Skip if this exact set was already translated
    if (lastTranslatedKeyRef.current === translationKey) {
      return;
    }
    
    // Filter out stories without required fields and map to translation format
    const storiesToTranslate = stories
      .filter(story => story.slug && story.title?.rendered) // Only translate stories with required fields
      .map(story => ({
        slug: story.slug,
        title: story.title || { rendered: '' },
        excerpt: story.excerpt || { rendered: '' },
        yoast_head_json: story.yoast_head_json ? { description: story.yoast_head_json.description } : undefined,
        success_stories_bottom_description: story.success_stories_bottom_description,
      }));
    
    if (storiesToTranslate.length === 0) {
      return; // No valid stories to translate
    }
    
    // Set flags IMMEDIATELY to prevent duplicate calls (before any async operations)
    translatingRef.current = true;
    lastTranslatedKeyRef.current = translationKey;
    
    translatePosts(storiesToTranslate, 'success_story').then((translated) => {
      translatingRef.current = false;
      if (translated.length > 0) {
        // Create a map of translated stories by slug for efficient lookup
        const translatedMap = new Map(
          translated.map((t, idx) => [storiesToTranslate[idx].slug, t])
        );
        
        const updatedStories = stories.map((story) => {
          const translatedStory = translatedMap.get(story.slug);
          if (translatedStory) {
            return {
              ...story,
              title: translatedStory.title,
              excerpt: translatedStory.excerpt,
              ...(translatedStory.yoast_head_json?.description && {
                yoast_head_json: {
                  ...story.yoast_head_json,
                  description: translatedStory.yoast_head_json.description,
                }
              }),
              ...(translatedStory.success_stories_bottom_description && {
                success_stories_bottom_description: translatedStory.success_stories_bottom_description
              }),
            };
          }
          return story;
        });
        setTranslatedStories(updatedStories);
      }
    }).catch(() => {
      translatingRef.current = false;
      // Reset key on error so it can retry
      lastTranslatedKeyRef.current = '';
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stories, language, translatePosts]);

  return (
    <div className="blog-container">
      <main className="blog-main">
        <div className="blog-main-header">
          <h1 className="blog-main-title">{t.components.successStoriesContent.title}</h1>
          <p className="blog-main-description">
            {t.components.successStoriesContent.description}
          </p>
        </div>

        <div className="blog-posts-container">
          {!initialLoadComplete && (!stories || stories.length === 0) ? (
            <div className="blog-posts-grid">
              {Array(12).fill(null).map((_, i) => <LoadingCard key={`skeleton-${i}`} />)}
            </div>
          ) : (
            <div className="blog-posts-grid">
              {stories && stories.length > 0 ? (
                // Remove duplicates by slug before mapping (keep first occurrence)
                Array.from(
                  new Map(stories.map(story => [story.slug || story.id, story])).values()
                )
                .slice(0, visibleCount)
                .map((story) => {
                  const translatedStory = translatedStories.find(ts => ts?.slug === story.slug || ts?.id === story.id);
                  const displayStory = translatedStory || story;
                  
                  return (
                    <article key={`${story.slug || story.id}-${story.id}`} className="blog-post-card">
                      {story.yoast_head_json?.og_image?.[0]?.url && (
                        <img
                          src={story.yoast_head_json.og_image[0].url}
                          alt={decodeHtmlEntities(displayStory.title.rendered)}
                          width="400"
                          height="250"
                          className="blog-post-image"
                        />
                      )}

                      <div className="blog-post-content">
                        <h2 className="blog-post-title">
                          <Link
                            href={language === 'en' ? `/success_stories/${story.slug}` : `/${language}/success_stories/${story.slug}`}
                            className="blog-post-link"
                          >
                            {decodeHtmlEntities(displayStory.title.rendered)}
                          </Link>
                        </h2>

                        <Link
                          href={`/success_stories/${story.slug}`}
                          className="blog-post-link"
                          style={{ textDecoration: 'none' }}
                        >
                          <p className="blog-post-excerpt">
                            {displayStory.yoast_head_json?.description 
                              ? decodeHtmlEntities(displayStory.yoast_head_json.description).slice(0, 250) + (displayStory.yoast_head_json.description.length > 250 ? '...' : '')
                              : displayStory.success_stories_bottom_description 
                                ? decodeHtmlEntities(displayStory.success_stories_bottom_description).replace(/<[^>]*>/g, '').slice(0, 250) + (displayStory.success_stories_bottom_description.length > 250 ? '...' : '')
                                : displayStory.excerpt?.rendered
                                  ? decodeHtmlEntities(displayStory.excerpt.rendered).replace(/<[^>]*>/g, '').slice(0, 250) + (displayStory.excerpt.rendered.length > 250 ? '...' : '')
                                  : t.components.successStoriesContent.noSummary}
                          </p>
                        </Link>

                        <time className="blog-post-date">
                          {new Date(story.date).toLocaleDateString()}
                        </time>
                      </div>
                    </article>
                  );
                })
              ) : (
                <div style={{ 
                  gridColumn: '1 / -1', 
                  textAlign: 'center', 
                  padding: '2rem',
                  background: '#f8f9fa',
                  borderRadius: '8px',
                  border: '1px solid #e9ecef'
                }}>
                  <h3 style={{ color: '#dc3545', marginBottom: '1rem' }}>🐛 Debug Information</h3>
                  <p><strong>Stories Array:</strong> {stories ? `Array with ${stories.length} items` : 'null/undefined'}</p>
                  <p><strong>Is Array:</strong> {Array.isArray(stories) ? 'Yes' : 'No'}</p>
                  <p><strong>Type:</strong> {typeof stories}</p>
                  {stories && (
                    <details style={{ marginTop: '1rem', textAlign: 'left' }}>
                      <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>Raw Data</summary>
                      <pre style={{ 
                        background: '#ffffff', 
                        padding: '1rem', 
                        borderRadius: '4px', 
                        overflow: 'auto',
                        fontSize: '12px',
                        textAlign: 'left'
                      }}>
                        {JSON.stringify(stories, null, 2)}
                      </pre>
                    </details>
                  )}
                  <p style={{ marginTop: '1rem' }}>Check the browser console for detailed API logs.</p>
                </div>
              )}
            </div>
          )}
        </div>
        {!isLoading && stories && stories.length > visibleCount && (
          <div style={{ textAlign: 'center', marginTop: '3rem', width: '100%' }}>
            <button
              onClick={() => setVisibleCount(prev => prev + 12)}
              className="see-more-button"
            >
              {t.components.successStoriesContent.seeMore || 'See More'}
            </button>
          </div>
        )}
      </main>
    </div>
  );
}