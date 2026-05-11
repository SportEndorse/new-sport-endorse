## Sport Endorse Website

Next.js 15 website backed by Turso db for content serving and translation caching.

## Local Development

```bash
npm install
npm run dev
```

Default local URL: `http://localhost:3000`

## Required Environment Variables

- `DATABASE_URL` - this is old, but used for the old neon db setup, using turso now
- `TURSO_DATABASE_URL` - for turso db
- `TURSO_AUTH_TOKEN` - for turso db
- `NEXT_PUBLIC_SITE_URL` (recommended for server-side metadata URL generation)

## WordPress -> Turso Sync

### Where the sync happens

- Sync endpoint: `app/api/wordpress/sync/route.ts`
- DB upsert logic: `app/api/wordpress/sync/route.ts` (`upsertPost`)
- Content read API (from Turso): `app/api/content/route.ts`
- DB read helpers: `utils/content-repository.ts`

### What gets synced

From WordPress endpoints:

- `/posts` -> `blog`
- `/presses` -> `press`
- `/podcasts` -> `podcast`
- `/success_stories` -> `success_story`

Data is written into:

- `posts`
- `post_content` (`language='en'`)

### How often sync runs

- Automatic: every 15 minutes per content type via staggered Vercel Cron (`vercel.json` -> `crons`)
- Manual: call `/api/wordpress/sync`
- Force manual sync (ignore interval gate): `/api/wordpress/sync?force=true`

To reduce timeout risk, prefer type-scoped sync calls:

- `/api/wordpress/sync?force=true&type=blog`
- `/api/wordpress/sync?force=true&type=press`
- `/api/wordpress/sync?force=true&type=podcast`
- `/api/wordpress/sync?force=true&type=success_story`

By default sync is skipped if run too soon after the latest DB update. The skip window is controlled by `WORDPRESS_SYNC_MIN_INTERVAL_MINUTES` (default `30`).

### Triggering sync manually

If `WORDPRESS_SYNC_SECRET` or `CRON_SECRET` is set, include either:

- `Authorization: Bearer <secret>`
- query param `?key=<secret>`

Examples:

```bash
curl -X POST "https://www.sportendorse.com/api/wordpress/sync?force=true" \
	-H "Authorization: Bearer $WORDPRESS_SYNC_SECRET"
```

```bash
curl -X POST "https://www.sportendorse.com/api/wordpress/sync?force=true&type=blog"
```

```bash
curl "https://www.sportendorse.com/api/wordpress/sync?force=true&key=$WORDPRESS_SYNC_SECRET"
```

### Checking sync status

Status endpoint:

- `GET /api/wordpress/sync/status`

If this endpoint returns your website HTML/404, your latest code is not deployed yet.

If `WORDPRESS_SYNC_SECRET` or `CRON_SECRET` is set, include either:

- `Authorization: Bearer <secret>`
- query param `?key=<secret>`

Example:

```bash
curl "https://www.sportendorse.com/api/wordpress/sync/status?key=$WORDPRESS_SYNC_SECRET"
```

Response includes:

- `lastUpdatedAt`
- `minutesSinceLastUpdate`
- `shouldRunSyncNow`
- `byType` counts and latest timestamps

## Caching Notes

- `/api/content` responses are explicitly `Cache-Control: no-store`.
- `/api/wordpress/sync` responses are explicitly `Cache-Control: no-store`.
- Metadata fallback utilities in `utils/wordpress-api.ts` use `revalidate: 86400` for lightweight slug/metadata fetches from WordPress.

## Troubleshooting Content Not Updating

If a WordPress post changed but website content did not:

1. Confirm sync route was actually called (Cron + deployment present).
2. Confirm sync was not skipped by interval (`skipped: true` response).
3. Run a forced sync (`force=true`) and verify `summaries` counts.
4. Verify sync auth headers/secret are correct.
5. Confirm Turso tables (`posts`, `post_content`) contain updated row values.
6. Re-check page source path:
	 - Main content loads from `/api/content` (Turso-backed).
	 - Some metadata and static slug generation still fetch directly from WordPress utilities.

## Useful Scripts

- `npm run dev`
- `npm run build`
- `npm run start`
- `npm run lint`
- `npm run translate:all`
- `npm run translate:success-bottoms`
- `npm run translate:success-meta`
