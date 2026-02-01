import { NextRequest, NextResponse } from 'next/server';
import { translateText, translateWordPressPost } from '@/utils/translate-service';

export const runtime = 'nodejs';
export const maxDuration = 30; // Allow up to 30 seconds for translation

interface TranslateRequest {
  text?: string;
  post?: {
    slug: string;
    title?: { rendered: string };
    excerpt?: { rendered: string };
    content?: { rendered: string };
    yoast_head_json?: { description?: string };
    success_stories_bottom_description?: string;
  };
  postType?: 'post' | 'podcast' | 'press' | 'success_story';
  language: 'es' | 'de' | 'fr';
  contextKey?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: TranslateRequest = await request.json();
    const { text, post, postType, language, contextKey } = body;

    // Validate language
    if (language !== 'es' && language !== 'de' && language !== 'fr') {
      return NextResponse.json(
        { error: 'Invalid language. Must be "es", "de", or "fr"' },
        { status: 400 }
      );
    }

    // Translate single text
    if (text && contextKey) {
      const translated = await translateText(text, language, contextKey);
      return NextResponse.json({ translated });
    }

    // Translate WordPress post
    if (post && postType) {
      // Validate post has required fields with detailed checks
      if (!post.slug) {
        return NextResponse.json(
          { error: 'Post is missing slug field' },
          { status: 400 }
        );
      }
      
      if (!post.title) {
        return NextResponse.json(
          { error: `Post ${post.slug} is missing title object` },
          { status: 400 }
        );
      }
      
      if (!post.title.rendered) {
        return NextResponse.json(
          { error: `Post ${post.slug} is missing title.rendered field` },
          { status: 400 }
        );
      }
      
      try {
        const translated = await translateWordPressPost(post, postType, language);
        return NextResponse.json({ translated });
      } catch (translateError) {
        console.error('Error in translateWordPressPost:', translateError);
        throw translateError; // Re-throw to be caught by outer catch
      }
    }

    return NextResponse.json(
      { error: 'Either "text" with "contextKey" or "post" with "postType" must be provided' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Translation API error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : undefined;
    
    // Log full error details for debugging
    console.error('Full error:', {
      message: errorMessage,
      stack: errorStack,
      error: error
    });
    
    return NextResponse.json(
      { 
        error: 'Translation failed', 
        details: errorMessage,
        ...(errorStack && { stack: errorStack })
      },
      { status: 500 }
    );
  }
}

