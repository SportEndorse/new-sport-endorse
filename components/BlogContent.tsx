"use client";

import Link from "next/link";

import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useWordPressData } from "@/context/WordPressDataContext";
import { useTranslation } from "@/hooks/useTranslation";
import translations from "@/utils/translations";
import "../styles/blog.css";

// Fallback image for blog posts without featured media
const FALLBACK_IMAGE = '/images/sportEndorseLogo-min.png';

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

export default function BlogContent() {
  const { language } = useLanguage();
  const t = translations[language];
  const { blogPosts: posts, loading, ensureListDataLoaded, fetchFirstBlogPosts } = useWordPressData();
  const { translatePosts } = useTranslation();
  const isLoading = loading.blogPosts;
  const [visibleCount, setVisibleCount] = useState(12);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  const [translatedPosts, setTranslatedPosts] = useState<typeof posts>([]);
  const translatingRef = useRef(false);
  const lastTranslatedKeyRef = useRef<string>('');

  // Fetch first 12 posts immediately, then load the rest
  useEffect(() => {
    let mounted = true;
    
    const loadProgressive = async () => {
      // First, fetch first 12 posts quickly
      const firstPosts = await fetchFirstBlogPosts(12);
      if (mounted && firstPosts.length > 0) {
        setInitialLoadComplete(true);
      }
      
      // Then load all posts in the background
      ensureListDataLoaded('blogPosts');
    };
    
    loadProgressive();
    
    return () => {
      mounted = false;
    };
  }, [fetchFirstBlogPosts, ensureListDataLoaded]);

  // Translate posts when language changes or posts are loaded
  useEffect(() => {
    // Early return if no posts or English
    if (posts.length === 0 || language === 'en') {
      if (language === 'en') {
        setTranslatedPosts([]);
        lastTranslatedKeyRef.current = '';
      }
      return;
    }
    
    // Create a unique key based on post slugs and language to prevent duplicate translations
    const postSlugs = posts
      .filter(p => p.slug && p.title?.rendered)
      .map(p => p.slug)
      .sort()
      .join(',');
    const translationKey = `${language}-${postSlugs}`;
    
    // Skip if already translating (check first to prevent race conditions)
    if (translatingRef.current) {
      return;
    }
    
    // Skip if this exact set was already translated
    if (lastTranslatedKeyRef.current === translationKey) {
      return;
    }
    
    // Filter out posts without required fields and map to translation format
    const postsToTranslate = posts
      .filter(post => post.slug && post.title?.rendered) // Only translate posts with required fields
      .map(post => ({
        slug: post.slug,
        title: post.title || { rendered: '' },
        excerpt: post.excerpt || { rendered: '' },
      }));
    
    if (postsToTranslate.length === 0) {
      return; // No valid posts to translate
    }
    
    // Set flags IMMEDIATELY to prevent duplicate calls (before any async operations)
    translatingRef.current = true;
    lastTranslatedKeyRef.current = translationKey;
    
    translatePosts(postsToTranslate, 'post').then((translated) => {
      translatingRef.current = false;
      if (translated.length > 0) {
        // Create a map of translated posts by slug for efficient lookup
        const translatedMap = new Map(
          translated.map((t, idx) => [postsToTranslate[idx].slug, t])
        );
        
        const updatedPosts = posts.map((post) => {
          const translatedPost = translatedMap.get(post.slug);
          if (translatedPost) {
            return {
              ...post,
              title: translatedPost.title,
              excerpt: translatedPost.excerpt,
            };
          }
          return post;
        });
        setTranslatedPosts(updatedPosts);
      }
    }).catch(() => {
      translatingRef.current = false;
      // Reset key on error so it can retry
      lastTranslatedKeyRef.current = '';
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [posts, language, translatePosts]);

  return (
    <div className="blog-container">
      {/* Main Content */}
      <main className="blog-main">
        <div className="blog-main-header">
          <h1 className="blog-main-title">{t.components.blog.title}</h1>
          <p className="blog-main-description">
            {t.components.blog.description}
          </p>
        </div>
        
        {/* Centered Posts Grid */}
        <div className="blog-posts-container">
          {!initialLoadComplete && posts.length === 0 ? (
            <div className="blog-posts-grid">
              {Array(12).fill(null).map((_, i) => <LoadingCard key={`skeleton-${i}`} />)}
            </div>
          ) : (
            <div className="blog-posts-grid">
              {posts.slice(0, visibleCount).map(post => {
                const translatedPost = translatedPosts.find(tp => tp?.id === post.id);
                const displayPost = translatedPost || post;
                
                return (
                  <article key={post.id} className="blog-post-card">
                    <img
                      src={post._embedded?.['wp:featuredmedia']?.[0]?.source_url || FALLBACK_IMAGE}
                      alt={decodeHtmlEntities(displayPost.title.rendered)}
                      width={400}
                      height={250}
                      className="blog-post-image"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        if (target.src !== FALLBACK_IMAGE) {
                          target.src = FALLBACK_IMAGE;
                        }
                      }}
                    />
                            
                    <div className="blog-post-content">
                      <h2 className="blog-post-title">
                        <Link
                          href={language === 'en' ? `/${post.slug}` : `/${language}/${post.slug}`}
                          className="blog-post-link"
                        >
                          {decodeHtmlEntities(displayPost.title.rendered)}
                        </Link>
                      </h2>
                                  
                      {displayPost.excerpt?.rendered && (
                        <div
                          className="blog-post-excerpt"
                          dangerouslySetInnerHTML={{
                            __html: decodeHtmlEntities(displayPost.excerpt.rendered)
                          }}
                        />
                      )}
                                  
                      <time className="blog-post-date">
                        {new Date(post.date).toLocaleDateString()}
                      </time>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
        {!isLoading && posts.length > visibleCount && (
          <div style={{ textAlign: 'center', marginTop: '3rem', width: '100%' }}>
            <button
              onClick={() => setVisibleCount(prev => prev + 12)}
              className="see-more-button"
            >
              {t.components.blog.seeMore || 'See More'}
            </button>
          </div>
        )}
      </main>
    </div>
  );
}