import { NextRequest, NextResponse } from 'next/server';
import { executeSql } from '@/utils/db';
import { ContentType } from '@/utils/content-repository';

type TypeSummary = {
  type: ContentType;
  count: number;
  latestUpdatedAt: string | null;
  latestPublishedAt: string | null;
};

function canReadStatus(request: NextRequest): boolean {
  const secret = process.env.WORDPRESS_SYNC_SECRET || process.env.CRON_SECRET;
  if (!secret) return true;

  const authHeader = request.headers.get('authorization');
  if (authHeader === `Bearer ${secret}`) return true;

  const key = new URL(request.url).searchParams.get('key');
  return key === secret;
}

export async function GET(request: NextRequest) {
  if (!canReadStatus(request)) {
    return NextResponse.json(
      { error: 'Unauthorized status request' },
      { status: 401, headers: { 'Cache-Control': 'no-store' } }
    );
  }

  try {
    const overallRows = (await executeSql(
      `SELECT
         COUNT(DISTINCT source_post_id) AS total_posts,
         MAX(updated_at) AS last_updated_at,
         MAX(published_at) AS last_published_at
       FROM unified_posts`,
      []
    )) as unknown as Array<{
      total_posts: number;
      last_updated_at: string | null;
      last_published_at: string | null;
    }>;

    const byTypeRows = (await executeSql(
      `SELECT
         type,
         COUNT(DISTINCT source_post_id) AS count,
         MAX(updated_at) AS latest_updated_at,
         MAX(published_at) AS latest_published_at
       FROM unified_posts
       GROUP BY type
       ORDER BY type ASC`,
      []
    )) as unknown as Array<{
      type: ContentType;
      count: number;
      latest_updated_at: string | null;
      latest_published_at: string | null;
    }>;

    const overall = overallRows[0];

    const summaries: TypeSummary[] = byTypeRows.map((row) => ({
      type: row.type,
      count: row.count,
      latestUpdatedAt: row.latest_updated_at,
      latestPublishedAt: row.latest_published_at,
    }));

    const now = Date.now();
    const lastUpdatedAt = overall?.last_updated_at || null;
    const minutesSinceLastUpdate = lastUpdatedAt
      ? Math.floor((now - new Date(lastUpdatedAt).getTime()) / (60 * 1000))
      : null;

    const minIntervalRaw = Number(process.env.WORDPRESS_SYNC_MIN_INTERVAL_MINUTES || 30);
    const minIntervalMinutes = Number.isFinite(minIntervalRaw) && minIntervalRaw >= 0 ? minIntervalRaw : 30;

    return NextResponse.json(
      {
        ok: true,
        generatedAt: new Date(now).toISOString(),
        syncWindowMinutes: minIntervalMinutes,
        totalPosts: overall?.total_posts || 0,
        lastUpdatedAt,
        lastPublishedAt: overall?.last_published_at || null,
        minutesSinceLastUpdate,
        shouldRunSyncNow:
          minutesSinceLastUpdate === null ? true : minutesSinceLastUpdate >= minIntervalMinutes,
        byType: summaries,
      },
      { headers: { 'Cache-Control': 'no-store' } }
    );
  } catch (error) {
    console.error('Sync status failed:', error);

    const hint = (error as { message?: string })?.message?.includes('no such table')
      ? 'unified_posts table is missing. Run: turso db shell sportendorse-prod < scripts/turso-schema.sql and then turso db shell sportendorse-prod < scripts/migrate-to-unified-posts.sql'
      : null;

    return NextResponse.json(
      { error: 'Failed to load sync status', hint },
      { status: 500, headers: { 'Cache-Control': 'no-store' } }
    );
  }
}
