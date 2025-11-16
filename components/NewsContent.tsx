"use client";

import { getNewsStories } from "../app/news/wordpress.js";
import Link from "next/link";

import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
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

interface NewsStory {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  slug: string;
  featured_media_url?: string;
  yoast_head_json?: {
    og_image?: Array<{
      url: string;
    }>;
  };
}

export default function NewsContent() {
  const { language } = useLanguage();
  const t = translations[language];
  const [newsStories, setNewsStories] = useState<NewsStory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNews() {
      try {
        const fetchedNews = await getNewsStories();
        setNewsStories(fetchedNews);
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, []);

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
          {loading ? (
            <div className="blog-loading" style={{ textAlign: 'center', padding: '2rem' }}>
              {t.components.news.loading}
            </div>
          ) : (
            <div className="blog-posts-grid">
              {newsStories.map(story => (
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
                        href={language === 'en' ? `/news/${story.slug}` : `/${language}/news/${story.slug}`}
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
      </main>
    </div>
  );
}