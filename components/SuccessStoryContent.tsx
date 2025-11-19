"use client";

import { useState, useEffect } from 'react';
import { useLanguage } from "@/context/LanguageContext";
import { useWordPressData } from "@/context/WordPressDataContext";
import translations from "@/utils/translations";
import MainLogo from '@/components/MainLogo';
import BackButton from '@/components/BackButton';
import { notFound } from 'next/navigation';
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

interface SuccessStory {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  slug: string;
  success_stories_bottom_description?: string;
  yoast_head_json?: {
    og_image?: Array<{ url: string }>;
    description?: string;
  };
}

interface SuccessStoryContentProps {
  slug: string;
}

export default function SuccessStoryContent({ slug }: SuccessStoryContentProps) {
  const { language } = useLanguage();
  const t = translations[language];
  const { getSuccessStoryBySlug, fetchSuccessStoryBySlug } = useWordPressData();
  const [story, setStory] = useState<SuccessStory | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // First check cache
    const cached = getSuccessStoryBySlug(slug);
    if (cached) {
      setStory(cached as SuccessStory);
      setIsLoading(false);
      return;
    }

    // Fetch just this one item
    fetchSuccessStoryBySlug(slug).then((fetchedStory) => {
      if (fetchedStory) {
        setStory(fetchedStory as SuccessStory);
      } else {
        notFound();
      }
      setIsLoading(false);
    });
  }, [slug, getSuccessStoryBySlug, fetchSuccessStoryBySlug]);

  const error = !story && !isLoading ? new Error('Success story not found') : null;

  if (isLoading) {
    return (
      <div className="blog-container">
        <div style={{ padding: '1rem 1rem 0 1rem', maxWidth: '1200px', margin: '0 auto' }}>
          <BackButton />
        </div>
        <main className="blog-main">
          <div className="blog-post-main-container">
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              {t.components.successStories.loading}
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error || !story) {
    return (
      <div className="blog-container">
        <div style={{ padding: '1rem 1rem 0 1rem', maxWidth: '1200px', margin: '0 auto' }}>
          <BackButton />
        </div>
        <main className="blog-main">
          <div className="blog-post-main-container">
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              Error loading success story
            </div>
          </div>
        </main>
      </div>
    );
  }

  const title = decodeHtmlEntities(story.title.rendered);
  const publishDate = story.date ? new Date(story.date) : null;

  return (
    <div className="blog-container">
      {/* Back Button at top of page */}
      <div style={{ padding: '1rem 1rem 0 1rem', maxWidth: '1200px', margin: '0 auto' }}>
        <BackButton />
      </div>

      {/* Main Content - Centered */}
      <main className="blog-main">
        <div className="blog-post-main-container">
          <article className="blog-post-article">
            <header className="blog-post-article-header">
              <h1 className="blog-post-article-title">{title}</h1>
              
              <div className="blog-post-article-meta">
                <time>
                  {publishDate ? publishDate.toLocaleDateString(
                    language === 'es' ? 'es-ES' : language === 'de' ? 'de-DE' : 'en-US'
                  ) : (
                    language === 'es' ? 'Fecha no disponible' : 
                    language === 'de' ? 'Datum nicht verfügbar' : 'Date not available'
                  )}
                </time>
                <span>
                  {language === 'es' ? 'Historia de Éxito' : 
                   language === 'de' ? 'Erfolgsgeschichte' : 'Success Story'}
                </span>
              </div>
              
              {story.yoast_head_json?.og_image?.[0]?.url && (
                <img 
                  src={story.yoast_head_json.og_image[0].url} 
                  alt={title}
                  className="blog-post-article-image"
                  style={{width:"auto", maxWidth:"1200px"}}
                />
              )}
            </header>
            
            <div className="blog-post-article-content">
              <div className="blog-post-prose">
                {/* Show description if available */}
                {story.yoast_head_json?.description && (
                  <div className="success-story-description" style={{ 
                    fontSize: '1.125rem', 
                    fontStyle: 'italic', 
                    marginBottom: '2rem',
                    padding: '1rem',
                    background: '#f8f9fa',
                    borderLeft: '4px solid #0078c1',
                    borderRadius: '4px'
                  }}>
                    {decodeHtmlEntities(story.yoast_head_json.description)}
                  </div>
                )}
                
                {/* Show bottom description if available */}
                {story.success_stories_bottom_description && (
                  <div className="success-story-bottom-description" style={{ 
                    fontSize: '1rem', 
                    marginBottom: '2rem',
                    padding: '1rem',
                    background: '#f1f3f4',
                    borderLeft: '4px solid #28a745',
                    borderRadius: '4px'
                  }}>
                    {decodeHtmlEntities(story.success_stories_bottom_description).replace(/<[^>]*>/g, '')}
                  </div>
                )}
                
                <div 
                  dangerouslySetInnerHTML={{ 
                    __html: story.content.rendered 
                  }} 
                />
              </div>
            </div>
          </article>
        </div>
        
        {/* Main Logo at bottom */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem', paddingBottom: '2rem' }}>
          <MainLogo />
        </div>
      </main>
    </div>
  );
}