import { NextRequest, NextResponse } from 'next/server';
import { ContentLanguage, ContentType, getPostBySlugFromDb, getPostsFromDb } from '@/utils/content-repository';

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
      const post = await getPostBySlugFromDb({ type, slug, language });
      if (!post) {
        return NextResponse.json({ error: 'Not found' }, { status: 404 });
      }
      return NextResponse.json({ post });
    }

    const posts = await getPostsFromDb({ type, language, limit });
    return NextResponse.json({ posts });
  } catch (error) {
    console.error('Content API error:', error);
    return NextResponse.json({ error: 'Failed to load content' }, { status: 500 });
  }
}
