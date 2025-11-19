"use client";

import { stripHtml, formatDate, createExcerpt } from "@/utils/wordpress-helpers";
import Link from "next/link";

import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useWordPressData } from "@/context/WordPressDataContext";
import translations from "@/utils/translations";
import "../styles/blog.css";
import "../styles/podcasts.css";

// Function to decode HTML entities
function decodeHtmlEntities(text: string): string {
  if (!text) return text;
  const entities: Record<string, string> = {
    "&#038;": "&",
    "&#8217;": "'",
    "&#8216;": "'",
    "&#8220;": '"',
    "&#8221;": '"',
    "&#8211;": "–",
    "&#8212;": "—",
    "&amp;": "&",
    "&quot;": '"',
    "&apos;": "'",
    "&lt;": "<",
    "&gt;": ">",
    "&nbsp;": " "
  };
  let decodedText = text;
  for (const [entity, replacement] of Object.entries(entities)) {
    decodedText = decodedText.replace(new RegExp(entity, "g"), replacement);
  }
  return decodedText;
}

interface Podcast {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  slug: string;
  featured_media_url?: string;
}

// Podcast iframe URLs list
const podcastIframes = [
  'https://podomatic.com/embed/html5/podcast/6266614',
  'https://podomatic.com/embed/html5/episode/10791101',
  'https://podomatic.com/embed/html5/episode/10797470',
  'https://podomatic.com/embed/html5/episode/10784445',
  'https://podomatic.com/embed/html5/episode/10771515',
  'https://podomatic.com/embed/html5/episode/10764959',
  'https://podomatic.com/embed/html5/episode/10757717',
  'https://podomatic.com/embed/html5/episode/10750287',
  'https://podomatic.com/embed/html5/episode/10743603',
  'https://www.podomatic.com/embed/html5/episode/10593667',
  'https://www.podomatic.com/embed/html5/episode/10571774',
  'https://www.podomatic.com/embed/html5/episode/10561829',
  'https://www.podomatic.com/embed/html5/episode/10536784',
  'https://www.podomatic.com/embed/html5/episode/10535965',
  'https://www.podomatic.com/embed/html5/episode/10485866',
  'https://podomatic.com/embed/html5/episode/10470396',
  'https://podomatic.com/embed/html5/episode/10466181',
  'https://podomatic.com/embed/html5/episode/10391839',
  'https://podomatic.com/embed/html5/episode/10289302',
  'https://podomatic.com/embed/html5/episode/10238169',
  'https://podomatic.com/embed/html5/episode/10144287',
  'https://podomatic.com/embed/html5/episode/10089429',
  'https://podomatic.com/embed/html5/episode/10081744',
  'https://podomatic.com/embed/html5/episode/10067317',
  'https://podomatic.com/embed/html5/episode/10061283',
  'https://podomatic.com/embed/html5/episode/10025277',
  'https://podomatic.com/embed/html5/episode/10019293',
  'https://podomatic.com/embed/html5/episode/10013347',
  'https://podomatic.com/embed/html5/episode/10007910',
  'https://podomatic.com/embed/html5/episode/10007928',
  'https://podomatic.com/embed/html5/episode/9956380',
  'https://podomatic.com/embed/html5/episode/9950355',
  'https://podomatic.com/embed/html5/episode/9940355'
];

// Individual podcast card component
function PodcastCard({ podcast, index, language, t }: { podcast: Podcast; index: number; language: string; t: typeof translations.en }) {
  const title = decodeHtmlEntities(stripHtml(podcast.title.rendered));
  const excerpt = decodeHtmlEntities(createExcerpt(podcast.excerpt.rendered, 250));
  const date = formatDate(podcast.date);
  const iframeUrl = podcastIframes[index] || podcastIframes[0];
  
  return (
    <article className="blog-post-card podcasts-card">
      <div className="podcasts-card-content">
        <div className="podcasts-card-header">
          <time className="podcasts-card-date">
            {date}
          </time>
          <span className="podcasts-card-badge">
            Podcast
          </span>
        </div>
        
        <h2 className="blog-post-title">
          {title}
        </h2>
        
        <p className="blog-post-excerpt">
          {excerpt}
        </p>

        {/* iframe */}
        <iframe 
          src={iframeUrl} 
          height='208' 
          width='100%' 
          frameBorder='0' 
          marginHeight={0} 
          marginWidth={0} 
          scrolling='no' 
          loading='lazy'
          allowFullScreen
          className="podcasts-card-iframe"
        ></iframe>
        
        <div className="podcasts-card-footer">
          <div className="podcasts-card-share">
            <svg className="podcasts-card-share-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <a href={language === 'en' ? `/podcasts/${podcast.slug}` : `/${language}/podcasts/${podcast.slug}`}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </a>
            </svg>
          </div>
          <Link href={language === 'en' ? `/podcasts/${podcast.slug}` : `/${language}/podcasts/${podcast.slug}`}>
            <button className="podcasts-card-read-more">
              {t.components.podcasts.readMore}
            </button>
          </Link>
        </div>
      </div>
    </article>
  );
}

// Loading skeleton card component for podcasts
function PodcastLoadingCard() {
  return (
    <article className="blog-post-card podcasts-card" style={{ opacity: 0.7 }}>
      <div className="podcasts-card-content">
        <div className="podcasts-card-header">
          <div style={{ 
            height: '16px', 
            background: '#e0e0e0', 
            borderRadius: '4px', 
            width: '100px'
          }} />
          <div style={{ 
            height: '20px', 
            background: '#e0e0e0', 
            borderRadius: '4px', 
            width: '80px'
          }} />
        </div>
        
        <div style={{ 
          height: '24px', 
          background: '#e0e0e0', 
          borderRadius: '4px', 
          marginBottom: '0.5rem',
          width: '90%'
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
          width: '75%'
        }} />

        {/* iframe skeleton */}
        <div style={{ 
          width: '100%', 
          height: '208px', 
          background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 1.5s infinite',
          borderRadius: '4px',
          marginBottom: '1rem'
        }} />
        
        <div className="podcasts-card-footer">
          <div style={{ width: '24px', height: '24px', background: '#e0e0e0', borderRadius: '50%' }} />
          <div style={{ 
            height: '32px', 
            background: '#e0e0e0', 
            borderRadius: '4px', 
            width: '120px'
          }} />
        </div>
      </div>
    </article>
  );
}

export default function PodcastsContent() {
  const { language } = useLanguage();
  const t = translations[language];
  const { podcasts, error, ensureListDataLoaded, fetchFirstPodcasts } = useWordPressData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);

  useEffect(() => {
    // Load HubSpot script
    if (!document.querySelector('script[src="https://js.hsforms.net/forms/embed/4025606.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://js.hsforms.net/forms/embed/4025606.js';
      script.defer = true;
      document.head.appendChild(script);
    }
    
    // Fetch first 6 podcasts immediately, then load the rest
    let mounted = true;
    
    const loadProgressive = async () => {
      // First, fetch first 6 podcasts quickly
      const firstPodcasts = await fetchFirstPodcasts(6);
      if (mounted && firstPodcasts.length > 0) {
        setInitialLoadComplete(true);
      }
      
      // Then load all podcasts in the background
      ensureListDataLoaded('podcasts');
    };
    
    loadProgressive();
    
    return () => {
      mounted = false;
    };
  }, [fetchFirstPodcasts, ensureListDataLoaded]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="blog-container">
      {/* Header - Always visible */}
      <header className="podcasts-header">
        <div className="podcasts-header-container">
          <div className="podcasts-header-content">
            <h1 className="podcasts-header-title">
              {t.components.podcasts.title}
            </h1>
            <p className="podcasts-header-description">
              {t.components.podcasts.description}
            </p>
            
            <div className="podcasts-platforms-container">
              <a href="https://podcasts.apple.com/ie/podcast/the-athlete-sitdown/id1550095395" target="_blank" rel="noopener noreferrer">
                <img 
                  src="/images/podcast/apple-podcasts-logo.webp"
                  loading="lazy"
                  sizes="(max-width: 768px) 120px, 150px" 
                  alt="Apple Podcasts logo" 
                  width={96}
                  height={32}
                  className="podcasts-platform-logo-apple"
                />
              </a>
              <a href="https://music.amazon.com/podcasts/47a22b01-42ad-447a-b137-1866a49890a1/the-athlete-sitdown" target="_blank" rel="noopener noreferrer">
                <img 
                  src="/images/podcast/amazon-music-logo.webp"
                  loading="lazy"
                  sizes="(max-width: 768px) 120px, 150px" 
                  alt="Amazon Music logo" 
                  width={90}
                  height={45}
                  className="podcasts-platform-logo-amazon"
                />
              </a>
              <a href="https://open.spotify.com/show/2c2mWOkxmUpeGyFI2dZgC5" target="_blank" rel="noopener noreferrer">
                <img 
                  src="/images/podcast/Spotify-Logo.webp"
                  loading="lazy"
                  sizes="(max-width: 768px) 120px, 150px" 
                  alt="Spotify logo" 
                  width={75}
                  height={75}
                  className="podcasts-platform-logo-spotify"
                />
              </a>
            </div>
            
            <div className="podcasts-info-container">
              <span className="podcasts-info-episodes">
                <svg className="podcasts-info-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
                30 {t.components.podcasts.episodes}
              </span>
              <span className="podcasts-info-separator">•</span>
              <span>{t.components.podcasts.discoverText}</span>
              <span className="podcasts-info-separator">•</span>
              <button 
                onClick={openModal}
                className="podcasts-feature-button">
                {t.components.podcasts.featureMe}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="blog-main">
        {error ? (
          <div className="podcasts-error-container">
            <div className="podcasts-error-content">
              <div className="podcasts-error-icon">⚠️</div>
              <h2 className="podcasts-error-title">Something went wrong</h2>
              <p className="podcasts-error-message">{error.message}</p>
            </div>
          </div>
        ) : !initialLoadComplete && podcasts.length === 0 ? (
          <div className="blog-posts-container">
            <div className="blog-posts-grid">
              {Array(6).fill(null).map((_, i) => <PodcastLoadingCard key={`skeleton-${i}`} />)}
            </div>
          </div>
        ) : podcasts.length === 0 ? (
          <div className="podcasts-empty-container">
            <div className="podcasts-empty-icon">🎙️</div>
            <h2 className="podcasts-empty-title">No podcasts found</h2>
            <p className="podcasts-empty-message">Check back later for new episodes!</p>
          </div>
        ) : (
          <>
            <div className="blog-posts-container">
              <div className="blog-posts-grid">
                {podcasts.slice(0, visibleCount).map((podcast, index) => (
                  <PodcastCard key={podcast.id} podcast={podcast} index={index} language={language} t={t} />
                ))}
              </div>
            </div>
            {podcasts.length > visibleCount && (
              <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                <button
                  onClick={() => setVisibleCount(prev => prev + 6)}
                  className="see-more-button"
                >
                  {t.components.podcasts.seeMore || 'See More'}
                </button>
              </div>
            )}
          </>
        )}
      </main>

      {/* HubSpot Form Modal */}
      {isModalOpen && (
        <div 
          className="podcasts-modal-overlay"
          onClick={closeModal}
        >
          <div 
            className="podcasts-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="podcasts-modal-header">
              <h3 className="podcasts-modal-title">
                {t.components.podcasts.featureMeTitle}
              </h3>
              <button 
                onClick={closeModal}
                className="podcasts-modal-close"
              >
                <svg className="podcasts-modal-close-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="podcasts-form-container">
              <div className="hs-form-frame" data-region="na1" data-form-id="13276a4b-b32c-41b1-b32b-bbd02c12e8dc" data-portal-id="4025606"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}