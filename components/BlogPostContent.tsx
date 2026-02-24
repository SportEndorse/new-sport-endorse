"use client";

import { useState, useEffect } from 'react';
import { useLanguage } from "@/context/LanguageContext";
import { useWordPressData } from "@/context/WordPressDataContext";
import { useTranslation } from "@/hooks/useTranslation";
import translations from "@/utils/translations";
import MainLogo from '@/components/MainLogo';
import BlogBackButton from '@/components/BlogBackButton';
import { notFound } from 'next/navigation';

import "../styles/blog.css";

// Fallback image for blog posts without featured media
const FALLBACK_IMAGE = '/images/sportEndorseLogo-min.png';

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
  yoast_head_json?: {
    description?: string;
  };
}

interface BlogPostContentProps {
  slug: string;
}

export default function BlogPostContent({ slug }: BlogPostContentProps) {
  const { language } = useLanguage();
  const t = translations[language];
  const { getBlogPostBySlug, fetchBlogPostBySlug } = useWordPressData();
  const { translatePost, translating } = useTranslation();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [translatedPost, setTranslatedPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setTranslatedPost(null);

    // First check cache (per-language cache is cleared on language change)
    const cached = getBlogPostBySlug(slug);
    if (cached) {
      setPost(cached as BlogPost);
      setIsLoading(false);
      return;
    }

    // Fetch just this one item for the current language
    fetchBlogPostBySlug(slug).then((fetchedPost) => {
      if (fetchedPost) {
        setPost(fetchedPost as BlogPost);
      } else {
        notFound();
      }
      setIsLoading(false);
    });
  }, [slug, language, getBlogPostBySlug, fetchBlogPostBySlug]);

  // Translate post when language changes or post is loaded
  useEffect(() => {
    if (post && language !== 'en') {
      translatePost(
        {
          slug: post.slug,
          title: post.title,
          excerpt: post.excerpt,
          content: post.content,
          yoast_head_json: post.yoast_head_json ? { description: post.yoast_head_json.description } : undefined,
        },
        'post'
      ).then((translated) => {
        if (translated) {
          setTranslatedPost({
            ...post,
            title: translated.title,
            excerpt: translated.excerpt,
            content: translated.content || post.content,
            ...(translated.yoast_head_json && {
              yoast_head_json: {
                ...post.yoast_head_json,
                description: translated.yoast_head_json.description,
              }
            }),
          });
        }
      });
    } else if (post && language === 'en') {
      setTranslatedPost(null);
    }
  }, [post, language, translatePost]);

  const error = !post && !isLoading ? new Error('Post not found') : null;
  
  // Use translated post if available, otherwise use original
  const displayPost = translatedPost || post;
  const isTranslating = translating && language !== 'en';

  if (isLoading || (isTranslating && !translatedPost)) {
    return (
      <div className="blog-container">
        <div style={{ padding: '1rem 1rem 0 1rem', maxWidth: '1200px', margin: '0 auto' }}>
          <BlogBackButton />
        </div>
        <main className="blog-main">
          <div className="blog-post-main-container">
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              {isTranslating ? t.components.blog.translating : t.components.blog.loading}
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
              {t.components.blog.errorLoading}
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
              <h1 className="blog-post-article-title">{displayPost?.title.rendered || post.title.rendered}</h1>
              
              <div className="blog-post-article-meta">
                <time>
                  {new Date(post.date).toLocaleDateString(
                    language === 'es' ? 'es-ES' : language === 'de' ? 'de-DE' : 'en-US'
                  )}
                </time>
                {post._embedded?.author?.[0] && (
                  <span>
                    {t.components.blog.by} {post._embedded.author[0].name}
                  </span>
                )}
              </div>
              
              <img 
                src={post._embedded?.['wp:featuredmedia']?.[0]?.source_url || FALLBACK_IMAGE} 
                alt={displayPost?.title.rendered || post.title.rendered}
                className="blog-post-article-image"
                width={1200}
                height={630}
                style={{width:"auto", maxWidth:"1200px"}}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (target.src !== FALLBACK_IMAGE) {
                    target.src = FALLBACK_IMAGE;
                  }
                }}
              />
            </header>
            
            <div className="blog-post-article-content">
              <div 
                className="blog-post-prose"
                dangerouslySetInnerHTML={{ 
                  __html: displayPost?.content?.rendered || post.content.rendered 
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