import path from 'path';
import { config as loadEnv } from 'dotenv';
import { translateText } from '../utils/translate-service';
import { getPostsFromDb, upsertPostContent } from '../utils/content-repository';
import { ContentLanguage } from '../utils/content-repository';

// Load environment variables from .env.local first, then .env
loadEnv({ path: path.resolve(process.cwd(), '.env.local') });
loadEnv();

// Restrict to non-English targets for translation utility typing
const TARGET_LANGS: Array<'es' | 'de' | 'fr'> = ['es', 'de', 'fr'];

async function main() {
  console.log('Fetching English success stories with bottom descriptions...');
  const englishPosts = await getPostsFromDb({ type: 'success_story', language: 'en' });

  const candidates = englishPosts.filter(p => p.success_stories_bottom_description);
  console.log(`Found ${candidates.length} success stories with bottom descriptions.`);

  for (const post of candidates) {
    const bottomEn = post.success_stories_bottom_description || '';
    const slug = post.slug;

    for (const lang of TARGET_LANGS) {
      try {
        const translated = await translateText(
          bottomEn,
          lang,
          `success_story-${slug}-bottom-description`
        );

        await upsertPostContent({
          type: 'success_story',
          slug,
          language: lang,
          title: post.title.rendered,
          excerpt: post.excerpt?.rendered || '',
          content: post.content?.rendered || null,
          yoastDescription: post.yoast_head_json?.description || null,
          bottomDescription: translated,
        });

        console.log(`Updated ${slug} bottom description -> ${lang}`);
      } catch (error) {
        console.error(`Failed to translate bottom description for ${slug} to ${lang}:`, error);
      }
    }
  }

  console.log('Bottom description translation completed.');
}

main().catch((error) => {
  console.error('Script failed:', error);
  process.exit(1);
});
