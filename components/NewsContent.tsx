"use client";

import Link from "next/link";

import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useWordPressData } from "@/context/WordPressDataContext";
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
  const isLoading = loading.newsStories;
  const [visibleCount, setVisibleCount] = useState(12);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);

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
              {newsStories.slice(0, visibleCount).map(story => (
                <article key={story.id} className="blog-post-card">
                  {story.yoast_head_json?.og_image?.[0]?.url && (
                    <img
                      src={story.yoast_head_json.og_image[0].url}
                      alt={decodeHtmlEntities(story.title.rendered)}
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
                        {decodeHtmlEntities(story.title.rendered)}
                      </Link>
                    </h2>
                              
                    <div
                      className="blog-post-excerpt"
                      dangerouslySetInnerHTML={{
                        __html: decodeHtmlEntities(story.excerpt.rendered)
                      }}
                    />
                              
                    <time className="blog-post-date">
                      {new Date(story.date).toLocaleDateString()}
                    </time>
                  </div>
                </article>
              ))}
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