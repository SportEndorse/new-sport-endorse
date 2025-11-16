"use client";

import { getAllPosts } from "../app/blog/wordpress.js";
import Link from "next/link";
import Image from "next/image";
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

interface BlogPost {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  slug: string;
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
    }>;
  };
}

export default function BlogContent() {
  const { language } = useLanguage();
  const t = translations[language];
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const fetchedPosts = await getAllPosts();
        setPosts(fetchedPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

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
          {loading ? (
            <div className="blog-loading" style={{ textAlign: 'center', padding: '2rem' }}>
              {t.components.blog.loading}
            </div>
          ) : (
            <div className="blog-posts-grid">
              {posts.map(post => (
                <article key={post.id} className="blog-post-card">
                  {post._embedded?.['wp:featuredmedia']?.[0]?.source_url && (
                    <Image
                      src={post._embedded['wp:featuredmedia'][0].source_url}
                      alt={decodeHtmlEntities(post.title.rendered)}
                      width={400}
                      height={250}
                      className="blog-post-image"
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
                    />
                  )}
                          
                  <div className="blog-post-content">
                    <h2 className="blog-post-title">
                      <Link
                        href={language === 'en' ? `/blog/${post.slug}` : `/${language}/blog/${post.slug}`}
                        className="blog-post-link"
                      >
                        {decodeHtmlEntities(post.title.rendered)}
                      </Link>
                    </h2>
                              
                    <div
                      className="blog-post-excerpt"
                      dangerouslySetInnerHTML={{
                        __html: decodeHtmlEntities(post.excerpt.rendered)
                      }}
                    />
                              
                    <time className="blog-post-date">
                      {new Date(post.date).toLocaleDateString()}
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