"use client";

import { useState, useEffect } from 'react';
import { useLanguage } from "@/context/LanguageContext";
import translations from "@/utils/translations";
import MainLogo from '@/components/MainLogo';
import BlogBackButton from '@/components/BlogBackButton';
import { getPostBySlug } from '../app/blog/wordpress';
import { notFound } from 'next/navigation';

import "../styles/blog.css";

interface BlogPost {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  slug: string;
  _embedded?: {
    author?: Array<{ name: string }>;
    'wp:featuredmedia'?: Array<{ source_url: string }>;
  };
}

interface BlogPostContentProps {
  slug: string;
}

export default function BlogPostContent({ slug }: BlogPostContentProps) {
  const { language } = useLanguage();
  const t = translations[language];
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const fetchedPost = await getPostBySlug(slug);
        if (!fetchedPost) {
          notFound();
          return;
        }
        setPost(fetchedPost);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="blog-container">
        <div style={{ padding: '1rem 1rem 0 1rem', maxWidth: '1200px', margin: '0 auto' }}>
          <BlogBackButton />
        </div>
        <main className="blog-main">
          <div className="blog-post-main-container">
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              {t.components.blog.loading}
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="blog-container">
        <div style={{ padding: '1rem 1rem 0 1rem', maxWidth: '1200px', margin: '0 auto' }}>
          <BlogBackButton />
        </div>
        <main className="blog-main">
          <div className="blog-post-main-container">
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              Error loading blog post
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
        <BlogBackButton />
      </div>

      {/* Main Content - Centered */}
      <main className="blog-main">
        <div className="blog-post-main-container">
          <article className="blog-post-article">
            <header className="blog-post-article-header">
              <h1 className="blog-post-article-title">{post.title.rendered}</h1>
              
              <div className="blog-post-article-meta">
                <time>
                  {new Date(post.date).toLocaleDateString(
                    language === 'es' ? 'es-ES' : language === 'de' ? 'de-DE' : 'en-US'
                  )}
                </time>
                {post._embedded?.author?.[0] && (
                  <span>
                    {language === 'es' ? 'Por' : language === 'de' ? 'Von' : 'By'} {post._embedded.author[0].name}
                  </span>
                )}
              </div>
              
              {post._embedded?.['wp:featuredmedia']?.[0]?.source_url && (
                <img src={post._embedded['wp:featuredmedia'][0].source_url} 
                  alt={post.title.rendered}
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
                  __html: post.content.rendered 
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