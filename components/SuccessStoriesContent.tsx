"use client";

import { getAllSuccessStories } from "../app/success-stories/wordpress.js";
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

interface SuccessStory {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  slug: string;
  featured_media_url?: string;
  success_stories_bottom_description?: string;
  yoast_head_json?: {
    og_image?: Array<{
      url: string;
    }>;
    description?: string;
  };
}

export default function SuccessStoriesContent() {
  const { language } = useLanguage();
  const t = translations[language];
  const [stories, setStories] = useState<SuccessStory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStories() {
      try {
        const fetchedStories = await getAllSuccessStories();
        setStories(fetchedStories);
      } catch (error) {
        console.error('Error fetching success stories:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchStories();
  }, []);

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
          {loading ? (
            <div className="blog-loading" style={{ textAlign: 'center', padding: '2rem' }}>
              {t.components.successStoriesContent.loading}
            </div>
          ) : (
            <div className="blog-posts-grid">
              {stories && stories.length > 0 ? (
                stories.map((story) => (
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
                          href={language === 'en' ? `/success-stories/${story.slug}` : `/${language}/success-stories/${story.slug}`}
                          className="blog-post-link"
                        >
                          {decodeHtmlEntities(story.title.rendered)}
                        </Link>
                      </h2>

                      <Link
                        href={`/success-stories/${story.slug}`}
                        className="blog-post-link"
                        style={{ textDecoration: 'none' }}
                      >
                        <p className="blog-post-excerpt">
                          {story.yoast_head_json?.description 
                            ? decodeHtmlEntities(story.yoast_head_json.description).slice(0, 250) + (story.yoast_head_json.description.length > 250 ? '...' : '')
                            : story.success_stories_bottom_description 
                              ? decodeHtmlEntities(story.success_stories_bottom_description).replace(/<[^>]*>/g, '').slice(0, 250) + (story.success_stories_bottom_description.length > 250 ? '...' : '')
                              : t.components.successStoriesContent.noSummary}
                        </p>
                      </Link>

                      <time className="blog-post-date">
                        {new Date(story.date).toLocaleDateString()}
                      </time>
                    </div>
                  </article>
                ))
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
      </main>
    </div>
  );
}