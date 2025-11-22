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

export default function NewsContent() {
  const { language } = useLanguage();
  const t = translations[language];
  const { newsStories, loading, ensureListDataLoaded, fetchFirstNewsStories } = useWordPressData();
  const { translatePosts } = useTranslation();
  const isLoading = loading.newsStories;
  const [visibleCount, setVisibleCount] = useState(12);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  const [translatedStories, setTranslatedStories] = useState<typeof newsStories>([]);
  const translatingRef = useRef(false);
  const lastTranslatedKeyRef = useRef<string>('');

  // Fetch first 12 news stories immediately, then load the rest
  useEffect(() => {
    let mounted = true;
    
    const loadProgressive = async () => {
      // First, fetch first 12 news stories quickly
      const firstStories = await fetchFirstNewsStories(12);
      if (mounted && firstStories.length > 0) {
        setInitialLoadComplete(true);
      }
      
      // Then load all news stories in the background
      ensureListDataLoaded('newsStories');
    };
    
    loadProgressive();
    
    return () => {
      mounted = false;
    };
  }, [fetchFirstNewsStories, ensureListDataLoaded]);

  // Translate news stories when language changes or stories are loaded
  useEffect(() => {
    // Early return if no stories or English
    if (newsStories.length === 0 || language === 'en') {
      if (language === 'en') {
        setTranslatedStories([]);
        lastTranslatedKeyRef.current = '';
      }
      return;
    }
    
    // Create a unique key based on story slugs and language to prevent duplicate translations
    const storySlugs = newsStories
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
    const storiesToTranslate = newsStories
      .filter(story => story.slug && story.title?.rendered) // Only translate stories with required fields
      .map(story => ({
        slug: story.slug,
        title: story.title || { rendered: '' },
        excerpt: story.excerpt || { rendered: '' },
      }));
    
    if (storiesToTranslate.length === 0) {
      return; // No valid stories to translate
    }
    
    // Set flags IMMEDIATELY to prevent duplicate calls (before any async operations)
    translatingRef.current = true;
    lastTranslatedKeyRef.current = translationKey;
    
    translatePosts(storiesToTranslate, 'press').then((translated) => {
      translatingRef.current = false;
      if (translated.length > 0) {
        // Create a map of translated stories by slug for efficient lookup
        const translatedMap = new Map(
          translated.map((t, idx) => [storiesToTranslate[idx].slug, t])
        );
        
        const updatedStories = newsStories.map((story) => {
          const translatedStory = translatedMap.get(story.slug);
          if (translatedStory) {
            return {
              ...story,
              title: translatedStory.title,
              excerpt: translatedStory.excerpt,
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
  }, [newsStories, language, translatePosts]);

  return (
    <div className="blog-container">
      {/* Main Content */}
      <main className="blog-main">
        <div className="blog-main-header">
          <h1 className="blog-main-title">{t.components.news.title}</h1>
          <p className="blog-main-description">
            {t.components.news.description}
          </p>
        </div>
        
        {/* Centered Posts Grid */}
        <div className="blog-posts-container">
          {!initialLoadComplete && newsStories.length === 0 ? (
            <div className="blog-posts-grid">
              {Array(12).fill(null).map((_, i) => <LoadingCard key={`skeleton-${i}`} />)}
            </div>
          ) : (
            <div className="blog-posts-grid">
              {newsStories.slice(0, visibleCount).map(story => {
                const translatedStory = translatedStories.find(ts => ts?.id === story.id);
                const displayStory = translatedStory || story;
                
                return (
                  <article key={story.id} className="blog-post-card">
                    {story.yoast_head_json?.og_image?.[0]?.url && (
                      <img
                        src={story.yoast_head_json.og_image[0].url}
                        alt={decodeHtmlEntities(displayStory.title.rendered)}
                        width={400}
                        height={250}
                        className="blog-post-image"
                        loading="lazy"/>
                    )}
                            
                    <div className="blog-post-content">
                      <h2 className="blog-post-title">
                        <Link
                          href={language === 'en' ? `/presses/${story.slug}` : `/${language}/presses/${story.slug}`}
                          className="blog-post-link"
                        >
                          {decodeHtmlEntities(displayStory.title.rendered)}
                        </Link>
                      </h2>
                                
                      {displayStory.excerpt?.rendered && (
                        <div
                          className="blog-post-excerpt"
                          dangerouslySetInnerHTML={{
                            __html: decodeHtmlEntities(displayStory.excerpt.rendered)
                          }}
                        />
                      )}
                                
                      <time className="blog-post-date">
                        {new Date(story.date).toLocaleDateString()}
                      </time>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
        {!isLoading && newsStories.length > visibleCount && (
          <div style={{ textAlign: 'center', marginTop: '3rem', width: '100%' }}>
            <button
              onClick={() => setVisibleCount(prev => prev + 12)}
              className="see-more-button"
            >
              {t.components.news.seeMore || 'See More'}
            </button>
          </div>
        )}
      </main>
    </div>
  );
}