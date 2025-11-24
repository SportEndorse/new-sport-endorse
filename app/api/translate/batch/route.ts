import { NextRequest, NextResponse } from 'next/server';
import { translateWordPressPost } from '@/utils/translate-service';

export const runtime = 'nodejs';
export const maxDuration = 30;

interface BatchTranslateRequest {
  posts: Array<{
    slug: string;
    title?: { rendered: string };
    excerpt?: { rendered: string };
    content?: { rendered: string };
    yoast_head_json?: { description?: string };
    success_stories_bottom_description?: string;
  }>;
  postType: 'post' | 'podcast' | 'press' | 'success_story';
  language: 'es' | 'de';
}

export async function POST(request: NextRequest) {
  try {
    const body: BatchTranslateRequest = await request.json();
    const { posts, postType, language } = body;

    // Validate language
    if (language !== 'es' && language !== 'de') {
      return NextResponse.json(
        { error: 'Invalid language. Must be "es" or "de"' },
        { status: 400 }
      );
    }

    if (!Array.isArray(posts) || posts.length === 0) {
      return NextResponse.json(
        { error: 'Posts array is required and must not be empty' },
        { status: 400 }
      );
    }

    // Validate all posts have required fields
    for (const post of posts) {
      if (!post.slug) {
        return NextResponse.json(
          { error: `Post is missing slug field` },
          { status: 400 }
        );
      }
      if (!post.title?.rendered) {
        return NextResponse.json(
          { error: `Post ${post.slug} is missing title.rendered field` },
          { status: 400 }
        );
      }
    }

    // Translate all posts in parallel (they're already cached in DB if needed)
    // This is faster than sequential and reduces total function execution time
    const translationPromises = posts.map(post => 
      translateWordPressPost(post, postType, language).catch(error => {
        console.error(`Error translating post ${post.slug}:`, error);
        // Return original post structure on error
        return {
          title: post.title || { rendered: '' },
          excerpt: post.excerpt || { rendered: '' },
          ...(post.content && { content: post.content }),
        };
      })
    );

    const translated = await Promise.all(translationPromises);

    return NextResponse.json({ translated });
  } catch (error) {
    console.error('Batch translation API error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    return NextResponse.json(
      { 
        error: 'Batch translation failed', 
        details: errorMessage,
      },
      { status: 500 }
    );
  }
}

