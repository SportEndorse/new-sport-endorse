import { NextRequest, NextResponse } from 'next/server';
import { ContentLanguage, ContentType, getPostBySlugFromDb, getPostsFromDb } from '@/utils/content-repository';
import {
  getFallbackPostBySlugFromWordPress,
  getFallbackPostsFromWordPress,
} from './wordpress-fallback';

const TYPE_MAP: Record<string, ContentType> = {
  blog: 'blog',
  post: 'blog',
  posts: 'blog',
  press: 'press',
  presses: 'press',
  news: 'press',
  podcast: 'podcast',
  podcasts: 'podcast',
  success_story: 'success_story',
  success_stories: 'success_story',
};

const LANGUAGES = new Set<ContentLanguage>(['en', 'es', 'de', 'fr']);

function getDbErrorDetails(error: unknown) {
  const details = error as { code?: string; message?: string; name?: string };
  return {
    code: details?.code || 'unknown',
    name: details?.name || 'Error',
    message: details?.message || 'Unknown database error',
  };
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const rawType = searchParams.get('type') || 'blog';
    const slug = searchParams.get('slug');
    const language = (searchParams.get('language') as ContentLanguage) || 'en';
    const limitParam = searchParams.get('limit');

    const type = TYPE_MAP[rawType];
    if (!type) {
      return NextResponse.json({ error: `Unsupported type ${rawType}` }, { status: 400 });
    }

    if (!LANGUAGES.has(language)) {
      return NextResponse.json({ error: `Unsupported language ${language}` }, { status: 400 });
    }

    const limit = limitParam ? Math.max(1, Math.min(100, Number(limitParam))) : undefined;

    if (slug) {
      let post = null;

      try {
        post = await getPostBySlugFromDb({ type, slug, language });
      } catch (dbError) {
        console.error('Content API database error, using WordPress fallback for slug:', getDbErrorDetails(dbError));
        try {
          post = await getFallbackPostBySlugFromWordPress({ type, slug, language });
          if (post) {
            return NextResponse.json(
              { post, source: 'wordpress-fallback' },
              { headers: { 'Cache-Control': 'no-store', 'X-Content-Source': 'wordpress-fallback' } }
            );
          }
        } catch (fallbackError) {
          console.error('WordPress fallback failed for slug request:', fallbackError);
          return NextResponse.json(
            { error: 'Failed to load content from both database and fallback source' },
            { status: 500, headers: { 'Cache-Control': 'no-store' } }
          );
        }
      }

      if (!post) {
        return NextResponse.json({ error: 'Not found' }, { status: 404, headers: { 'Cache-Control': 'no-store' } });
      }
      return NextResponse.json({ post }, { headers: { 'Cache-Control': 'no-store' } });
    }

    try {
      const posts = await getPostsFromDb({ type, language, limit });
      return NextResponse.json({ posts }, { headers: { 'Cache-Control': 'no-store' } });
    } catch (dbError) {
      console.error('Content API database error, using WordPress fallback for list:', getDbErrorDetails(dbError));
      try {
        const posts = await getFallbackPostsFromWordPress({ type, language, limit });
        return NextResponse.json(
          { posts, source: 'wordpress-fallback' },
          { headers: { 'Cache-Control': 'no-store', 'X-Content-Source': 'wordpress-fallback' } }
        );
      } catch (fallbackError) {
        console.error('WordPress fallback failed for list request:', fallbackError);
        return NextResponse.json(
          { error: 'Failed to load content from both database and fallback source' },
          { status: 500, headers: { 'Cache-Control': 'no-store' } }
        );
      }
    }
  } catch (error) {
    console.error('Content API error:', error);
    return NextResponse.json({ error: 'Failed to load content' }, { status: 500, headers: { 'Cache-Control': 'no-store' } });
  }
}
