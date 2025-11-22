"use client";

import { useState, useEffect } from 'react';
import { useLanguage } from "@/context/LanguageContext";
import { useWordPressData } from "@/context/WordPressDataContext";
import { useTranslation } from "@/hooks/useTranslation";
import translations from "@/utils/translations";
import MainLogo from '@/components/MainLogo';
import NewsBackButton from '@/components/NewsBackButton';
import { notFound } from 'next/navigation';

import "../styles/blog.css";

interface NewsStory {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  slug: string;
  yoast_head_json?: {
    og_image?: Array<{ url: string }>;
    description?: string;
  };
  _embedded?: {
    author?: Array<{ name: string }>;
  };
}

interface NewsContentProps {
  slug: string;
}

export default function NewsContent({ slug }: NewsContentProps) {
  const { language } = useLanguage();
  const t = translations[language];
  const { getNewsStoryBySlug, fetchNewsStoryBySlug } = useWordPressData();
  const { translatePost, translating } = useTranslation();
  const [newsStory, setNewsStory] = useState<NewsStory | null>(null);
  const [translatedNewsStory, setTranslatedNewsStory] = useState<NewsStory | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // First check cache
    const cached = getNewsStoryBySlug(slug);
    if (cached) {
      setNewsStory(cached as NewsStory);
      setIsLoading(false);
      return;
    }

    // Fetch just this one item
    fetchNewsStoryBySlug(slug).then((fetchedStory) => {
      if (fetchedStory) {
        setNewsStory(fetchedStory as NewsStory);
      } else {
        notFound();
      }
      setIsLoading(false);
    });
  }, [slug, getNewsStoryBySlug, fetchNewsStoryBySlug]);

  // Translate news story when language changes or story is loaded
  useEffect(() => {
    if (newsStory && language !== 'en') {
      translatePost(
        {
          slug: newsStory.slug,
          title: newsStory.title,
          excerpt: newsStory.excerpt,
          content: newsStory.content,
        },
        'press'
      ).then((translated) => {
        if (translated) {
          setTranslatedNewsStory({
            ...newsStory,
            title: translated.title,
            excerpt: translated.excerpt,
            content: translated.content || newsStory.content,
          });
        }
      });
    } else if (newsStory && language === 'en') {
      setTranslatedNewsStory(null);
    }
  }, [newsStory, language, translatePost]);

  const error = !newsStory && !isLoading ? new Error('News story not found') : null;
  
  // Use translated news story if available, otherwise use original
  const displayNewsStory = translatedNewsStory || newsStory;
  const isTranslating = translating && language !== 'en';

  if (isLoading || (isTranslating && !translatedNewsStory)) {
    return (
      <div className="blog-container">
        <div style={{ padding: '1rem 1rem 0 1rem', maxWidth: '1200px', margin: '0 auto' }}>
          <NewsBackButton />
        </div>
        <main className="blog-main">
          <div className="blog-post-main-container">
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              {isTranslating ? (language === 'es' ? 'Traduciendo...' : 'Übersetzen...') : t.components.news.loading}
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error || !newsStory) {
    return (
      <div className="blog-container">
        <div style={{ padding: '1rem 1rem 0 1rem', maxWidth: '1200px', margin: '0 auto' }}>
          <NewsBackButton />
        </div>
        <main className="blog-main">
          <div className="blog-post-main-container">
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              Error loading news story
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="blog-container">
      {/* Back Button at top of page */}
      <div style={{ padding: '1rem 1rem 0 1rem', maxWidth: '1200px', margin: '0 auto' }}>
        <NewsBackButton />
      </div>

      {/* Main Content - Centered */}
      <main className="blog-main">
        <div className="blog-post-main-container">
          <article className="blog-post-article">
            <header className="blog-post-article-header">
              <h1 className="blog-post-article-title">{displayNewsStory?.title.rendered || newsStory.title.rendered}</h1>
              
              <div className="blog-post-article-meta">
                <time>
                  {new Date(newsStory.date).toLocaleDateString(
                    language === 'es' ? 'es-ES' : language === 'de' ? 'de-DE' : 'en-US'
                  )}
                </time>
                {newsStory._embedded?.author?.[0] && (
                  <span>
                    {language === 'es' ? 'Por' : language === 'de' ? 'Von' : 'By'} {newsStory._embedded.author[0].name}
                  </span>
                )}
              </div>
              
              {newsStory.yoast_head_json?.og_image?.[0]?.url && (
                <img 
                  src={newsStory.yoast_head_json.og_image[0].url} 
                  alt={displayNewsStory?.title.rendered || newsStory.title.rendered}
                  className="blog-post-article-image"
                  width={1200}
                  height={630}
                  style={{width:"auto", maxWidth:"1200px"}}
                />
              )}
            </header>
            
            <div className="blog-post-article-content">
              <div 
                className="blog-post-prose"
                dangerouslySetInnerHTML={{ 
                  __html: displayNewsStory?.content?.rendered || newsStory.content.rendered 
                }} 
              />
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