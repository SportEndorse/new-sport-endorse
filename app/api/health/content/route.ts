import { NextRequest, NextResponse } from 'next/server';
import { executeSql } from '@/utils/db';
import { ContentType } from '@/utils/content-repository';

const EXPECTED_LANGUAGES = ['en', 'es', 'de', 'fr'] as const;

type LanguageRow = {
  language: string;
  row_count: number;
  logical_posts: number;
};

type TypeLanguageRow = {
  type: ContentType;
  language: string;
  row_count: number;
};

type MissingCoverageRow = {
  source_post_id: number;
  languages_present: string | null;
  language_count: number;
};

type DuplicateRow = {
  source_post_id: number;
  language: string;
  duplicate_count: number;
};

function canReadHealth(request: NextRequest): boolean {
  const secret =
    process.env.CONTENT_HEALTH_SECRET ||
    process.env.WORDPRESS_SYNC_SECRET ||
    process.env.CRON_SECRET;

  if (!secret) return true;

  const authHeader = request.headers.get('authorization');
  if (authHeader === `Bearer ${secret}`) return true;

  const key = new URL(request.url).searchParams.get('key');
  return key === secret;
}

function isMissingTableError(error: unknown): boolean {
  return Boolean((error as { message?: string })?.message?.includes('no such table: unified_posts'));
}

export async function GET(request: NextRequest) {
  if (!canReadHealth(request)) {
    return NextResponse.json(
      { error: 'Unauthorized health request' },
      { status: 401, headers: { 'Cache-Control': 'no-store' } }
    );
  }

  try {
    const overallRows = (await executeSql(
      `SELECT
         COUNT(*) AS total_rows,
         COUNT(DISTINCT source_post_id) AS total_logical_posts,
         COUNT(DISTINCT language) AS distinct_languages,
         COUNT(DISTINCT type) AS distinct_types,
         MAX(COALESCE(content_updated_at, post_updated_at, updated_at)) AS last_updated_at
       FROM unified_posts`,
      []
    )) as unknown as Array<{
      total_rows: number;
      total_logical_posts: number;
      distinct_languages: number;
      distinct_types: number;
      last_updated_at: string | null;
    }>;

    const byLanguage = (await executeSql(
      `SELECT
         language,
         COUNT(*) AS row_count,
         COUNT(DISTINCT source_post_id) AS logical_posts
       FROM unified_posts
       GROUP BY language
       ORDER BY language ASC`,
      []
    )) as unknown as LanguageRow[];

    const byTypeLanguage = (await executeSql(
      `SELECT
         type,
         language,
         COUNT(*) AS row_count
       FROM unified_posts
       GROUP BY type, language
       ORDER BY type ASC, language ASC`,
      []
    )) as unknown as TypeLanguageRow[];

    const missingCoverage = (await executeSql(
      `SELECT
         source_post_id,
         GROUP_CONCAT(language, ',') AS languages_present,
         COUNT(DISTINCT language) AS language_count
       FROM unified_posts
       GROUP BY source_post_id
       HAVING COUNT(DISTINCT language) < ?
       ORDER BY language_count ASC, source_post_id ASC
       LIMIT 200`,
      [EXPECTED_LANGUAGES.length]
    )) as unknown as MissingCoverageRow[];

    const duplicates = (await executeSql(
      `SELECT
         source_post_id,
         language,
         COUNT(*) AS duplicate_count
       FROM unified_posts
       GROUP BY source_post_id, language
       HAVING COUNT(*) > 1
       ORDER BY duplicate_count DESC, source_post_id ASC
       LIMIT 50`,
      []
    )) as unknown as DuplicateRow[];

    const overall = overallRows[0] || {
      total_rows: 0,
      total_logical_posts: 0,
      distinct_languages: 0,
      distinct_types: 0,
      last_updated_at: null,
    };

    const missingExpectedLanguages = EXPECTED_LANGUAGES.filter(
      (lang) => !byLanguage.some((row) => row.language === lang)
    );

    const healthy =
      overall.total_rows > 0 &&
      missingCoverage.length === 0 &&
      duplicates.length === 0 &&
      missingExpectedLanguages.length === 0;

    return NextResponse.json(
      {
        ok: true,
        healthy,
        generatedAt: new Date().toISOString(),
        expectedLanguages: EXPECTED_LANGUAGES,
        summary: {
          totalRows: overall.total_rows,
          totalLogicalPosts: overall.total_logical_posts,
          distinctLanguages: overall.distinct_languages,
          distinctTypes: overall.distinct_types,
          lastUpdatedAt: overall.last_updated_at,
        },
        checks: {
          missingExpectedLanguages,
          postsMissingLanguageCoverageCount: missingCoverage.length,
          duplicateLogicalLanguageRowsCount: duplicates.length,
        },
        byLanguage,
        byTypeLanguage,
        samples: {
          postsMissingLanguageCoverage: missingCoverage,
          duplicateLogicalLanguageRows: duplicates,
        },
      },
      { headers: { 'Cache-Control': 'no-store' } }
    );
  } catch (error) {
    if (isMissingTableError(error)) {
      return NextResponse.json(
        {
          ok: false,
          healthy: false,
          error: 'unified_posts table is missing',
          hint:
            'Run: turso db shell sportendorse-prod < scripts/turso-schema.sql and then turso db shell sportendorse-prod < scripts/migrate-to-unified-posts.sql',
        },
        { status: 500, headers: { 'Cache-Control': 'no-store' } }
      );
    }

    console.error('Content health endpoint failed:', error);
    return NextResponse.json(
      { ok: false, healthy: false, error: 'Failed to compute content health' },
      { status: 500, headers: { 'Cache-Control': 'no-store' } }
    );
  }
}
