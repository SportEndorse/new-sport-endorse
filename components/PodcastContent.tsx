"use client";

import { useState, useEffect, useMemo } from 'react';
import { useLanguage } from "@/context/LanguageContext";
import { useWordPressData } from "@/context/WordPressDataContext";
import translations from "@/utils/translations";
import MainLogo from '@/components/MainLogo';
import PodcastBackButton from '@/components/PodcastBackButton';
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

// Podcast iframe URLs list (same as main page)
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

interface Podcast {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  slug: string;
}

interface PodcastContentProps {
  slug: string;
}

export default function PodcastContent({ slug }: PodcastContentProps) {
  const { language } = useLanguage();
  const t = translations[language];
  const { getPodcastBySlug, fetchPodcastBySlug, podcasts } = useWordPressData();
  const [podcast, setPodcast] = useState<Podcast | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // First check cache
    const cached = getPodcastBySlug(slug);
    if (cached) {
      setPodcast(cached as Podcast);
      setIsLoading(false);
      return;
    }

    // Fetch just this one item
    fetchPodcastBySlug(slug).then((fetchedPodcast) => {
      if (fetchedPodcast) {
        setPodcast(fetchedPodcast as Podcast);
      } else {
        notFound();
      }
      setIsLoading(false);
    });
  }, [slug, getPodcastBySlug, fetchPodcastBySlug]);

  // Find the index of current podcast for iframe matching
  const iframeUrl = useMemo(() => {
    if (!podcast) return podcastIframes[0];
    const podcastIndex = podcasts.findIndex((p) => p.id === podcast.id);
    return podcastIframes[podcastIndex] || podcastIframes[0];
  }, [podcast, podcasts]);

  const error = !podcast && !isLoading ? new Error('Podcast not found') : null;

  if (isLoading) {
    return (
      <div className="blog-container">
        <div style={{ padding: '1rem 1rem 0 1rem', maxWidth: '1200px', margin: '0 auto' }}>
          <PodcastBackButton />
        </div>
        <main className="blog-main">
          <div className="blog-post-main-container">
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              {t.components.podcasts.loading}
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error || !podcast) {
    return (
      <div className="blog-container">
        <div style={{ padding: '1rem 1rem 0 1rem', maxWidth: '1200px', margin: '0 auto' }}>
          <PodcastBackButton />
        </div>
        <main className="blog-main">
          <div className="blog-post-main-container">
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              Error loading podcast
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
        <PodcastBackButton />
      </div>

      {/* Main Content - Centered */}
      <main className="blog-main">
        <div className="blog-post-main-container">
          <article className="blog-post-article">
            <header className="blog-post-article-header">
              <h2 className="blog-post-article-title">{decodeHtmlEntities(podcast.title.rendered)}</h2>
              
              <div className="blog-post-article-meta">
                <time>
                  {new Date(podcast.date).toLocaleDateString(
                    language === 'es' ? 'es-ES' : language === 'de' ? 'de-DE' : 'en-US'
                  )}
                </time>
                <span>
                  {language === 'es' ? 'Episodio de Podcast' : 
                   language === 'de' ? 'Podcast-Folge' : 'Podcast Episode'}
                </span>
              </div>
              
              {/* Podcast iframe */}
              <div style={{ marginTop: '2rem', marginBottom: '2rem' }}>
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
                  style={{ borderRadius: '8px', maxWidth: '600px', margin: '0 auto', display: 'block' }}
                />
              </div>
            </header>
            
            <div className="blog-post-article-content">
              <div className="blog-post-prose">
                <div 
                  dangerouslySetInnerHTML={{ 
                    __html: podcast.content.rendered 
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