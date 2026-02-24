import path from 'path';
import { config as loadEnv } from 'dotenv';
import { translateText } from '../utils/translate-service';
import { getPostsFromDb, getPostBySlugFromDb, upsertPostContent } from '../utils/content-repository';

// Load environment variables from .env.local first, then .env
loadEnv({ path: path.resolve(process.cwd(), '.env.local') });
loadEnv();

const TARGET_LANGS: Array<'es' | 'de' | 'fr'> = ['es', 'de', 'fr'];

async function main() {
  console.log('Fetching English success stories for title/description backfill...');
  const englishPosts = await getPostsFromDb({ type: 'success_story', language: 'en' });

  console.log(`Found ${englishPosts.length} success stories.`);

  for (const post of englishPosts) {
    const slug = post.slug;
    const titleEn = post.title?.rendered || '';
    const excerptEn = post.excerpt?.rendered || '';
    const descriptionEn = post.yoast_head_json?.description || '';
    const contentEn = post.content?.rendered || '';

    for (const lang of TARGET_LANGS) {
      try {
        // Preserve existing localized bottom description if present
        const existingLocalized = await getPostBySlugFromDb({ type: 'success_story', slug, language: lang });
        const bottom = existingLocalized?.success_stories_bottom_description || null;

        const translatedTitle = titleEn
          ? await translateText(titleEn, lang, `success_story-${slug}-title`)
          : '';
        const translatedExcerpt = excerptEn
          ? await translateText(excerptEn, lang, `success_story-${slug}-excerpt`)
          : '';
        const translatedDescription = descriptionEn
          ? await translateText(descriptionEn, lang, `success_story-${slug}-description`)
          : '';
        const translatedContent = contentEn
          ? await translateText(contentEn, lang, `success_story-${slug}-content`)
          : '';

        await upsertPostContent({
          type: 'success_story',
          slug,
          language: lang,
          title: translatedTitle || titleEn,
          excerpt: translatedExcerpt || excerptEn,
          content: translatedContent || contentEn || null,
          yoastDescription: translatedDescription || descriptionEn || null,
          bottomDescription: bottom,
        });

        console.log(`Updated ${slug} -> ${lang}`);
      } catch (error) {
        console.error(`Failed to translate meta for ${slug} to ${lang}:`, error);
      }
    }
  }

  console.log('Success story meta translation completed.');
}

main().catch((error) => {
  console.error('Script failed:', error);
  process.exit(1);
});