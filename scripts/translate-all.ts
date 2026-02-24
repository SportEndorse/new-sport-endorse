import path from 'path';
import { config as loadEnv } from 'dotenv';
import { translateWordPressPost } from '../utils/translate-service';
import {
  getPostsFromDb,
  ContentType,
  WordPressLikePost,
} from '../utils/content-repository';

// Load env vars from .env.local first (Next style), then fallback to .env
loadEnv({ path: path.resolve(process.cwd(), '.env.local') });
loadEnv();

const LANGUAGES: Array<'es' | 'de' | 'fr'> = ['es', 'de', 'fr'];
const CONTENT_TYPES: ContentType[] = ['blog', 'press', 'podcast', 'success_story'];

function mapContentTypeToPostType(type: ContentType): 'post' | 'press' | 'podcast' | 'success_story' {
  switch (type) {
    case 'blog':
      return 'post';
    case 'press':
      return 'press';
    case 'podcast':
      return 'podcast';
    case 'success_story':
      return 'success_story';
    default:
      throw new Error(`Unsupported content type ${type}`);
  }
}

async function translateAll() {
  for (const contentType of CONTENT_TYPES) {
    const postType = mapContentTypeToPostType(contentType);
    console.log(`\n=== Translating type: ${contentType} (${postType}) ===`);

    // Always pull English as the source
    const posts = await getPostsFromDb({ type: contentType, language: 'en' });
    console.log(`Found ${posts.length} ${contentType} posts to process.`);

    for (const post of posts) {
      for (const lang of LANGUAGES) {
        try {
          const normalizedPost = {
            slug: post.slug,
            title: post.title,
            excerpt: post.excerpt,
            content: post.content,
            yoast_head_json: post.yoast_head_json?.description != null
              ? { description: post.yoast_head_json.description ?? undefined }
              : undefined,
            success_stories_bottom_description: post.success_stories_bottom_description ?? undefined,
          };

          const result = await translateWordPressPost(
            normalizedPost,
            postType,
            lang
          );
          console.log(`Translated ${post.slug} -> ${lang}: title="${result.title.rendered.slice(0, 60)}"`);
        } catch (error) {
          console.error(`Failed to translate ${post.slug} to ${lang}:`, error);
        }
      }
    }
  }
}

translateAll()
  .then(() => {
    console.log('\nTranslation completed for all content types.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Translation run failed:', error);
    process.exit(1);
  });
