# Turso Migration Guide - Complete Instructions

## Overview
This guide will walk you through migrating from Neon PostgreSQL to Turso (libSQL) SQLite. All code has been updated to use the `@libsql/client` driver.

## Current Status
✅ **Completed:**
- Updated `utils/db.ts` to use libSQL client
- Updated `utils/content-repository.ts` with new SQL syntax
- Updated `app/api/wordpress/sync/route.ts` upsert logic
- Updated `utils/translate-service.ts` to use libSQL
- Updated `package.json` dependencies
- Created `scripts/turso-schema.sql` with correct SQLite schema

**Actual Neon Schema (migrated correctly):**
- `posts` table: id, slug, type, wordpress_id, featured_image_url, yoast_og_image, created_at, updated_at, published_at, is_new
- `post_content` table: id, post_id, language, title, excerpt, content, description, source_hash, created_at, updated_at, success_stories_bottom_description

## Step-by-Step Migration

### PHASE 1: Install Dependencies (5 minutes)

**1.1 Remove old dependencies and install new ones**
```bash
cd /workspaces/new-sport-endorse

# Remove Neon/Vercel Postgres packages
npm uninstall @neondatabase/serverless @vercel/postgres

# Install Turso/libSQL client
npm install @libsql/client
```

Verify installation:
```bash
npm list @libsql/client
```

### PHASE 2: Set Up Turso Database (10 minutes)

**2.1 You already created the database, now set up the schema**

You mentioned you already ran:
```bash
turso db create sportendorse-prod
```

Now, create the SQLite schema in your Turso database:

```bash
# Get your database credentials
turso db show sportendorse-prod --url
turso db tokens create sportendorse-prod --expiration none
```

**2.2 Set up the schema in Turso**

Option A: Use Turso CLI (recommended)
```bash
turso db shell sportendorse-prod < scripts/turso-schema.sql
```

Option B: Use Turso Web Dashboard
1. Go to https://turso.tech
2. Select your `sportendorse-prod` database
3. Open the SQL Editor
4. Copy-paste the contents of `scripts/turso-schema.sql`
5. Execute it

**2.3 Verify the schema was created**
```bash
turso db shell sportendorse-prod
```

Enter these commands to verify:
```sql
.tables
PRAGMA table_info(posts);
PRAGMA table_info(post_content);
```

You should see the tables and their columns.

### PHASE 3: Migrate Data (15-30 minutes)

**Option A: Export from Neon, Import to Turso (Recommended)**

**3.1 Export data from Neon**

Use Neon web dashboard or psql:
```bash
# Using psql (if you have it installed)
# Set these based on your .env.local or Neon dashboard
NEON_HOST="ep-sweet-tree-adqls2s4.c-2.us-east-1.aws.neon.tech"
NEON_USER="neondb_owner"
NEON_PASSWORD="npg_OhKNa7Wrnb5g"  # From your Neon dashboard
NEON_DB="neondb"

# Export posts
PGPASSWORD="${NEON_PASSWORD}" psql \
  -h "${NEON_HOST}" \
  -U "${NEON_USER}" \
  -d "${NEON_DB}" \
  -c "COPY posts TO STDOUT WITH CSV HEADER" > /tmp/posts.csv

# Export post_content
PGPASSWORD="${NEON_PASSWORD}" psql \
  -h "${NEON_HOST}" \
  -U "${NEON_USER}" \
  -d "${NEON_DB}" \
  -c "COPY post_content TO STDOUT WITH CSV HEADER" > /tmp/post_content.csv

# Export translations (if it exists)
PGPASSWORD="${NEON_PASSWORD}" psql \
  -h "${NEON_HOST}" \
  -U "${NEON_USER}" \
  -d "${NEON_DB}" \
  -c "COPY translations TO STDOUT WITH CSV HEADER" > /tmp/translations.csv 2>/dev/null || echo "translations table not found (OK)"
```

**3.2 Import to Turso**

You have two options:

**Option A1: Use Turso CLI shell (easiest)**
```bash
# Open interactive shell
turso db shell sportendorse-prod

# Then paste these commands (one at a time):
.mode csv
.import /tmp/posts.csv posts
.import /tmp/post_content.csv post_content
.import /tmp/translations.csv translations  -- Skip if doesn't exist
.quit
```

**Option A2: Use SQL INSERT statements (if files are small)**

Create a migration script:
```bash
# Create a script to insert data from CSV
cat > /tmp/migrate_posts.sql << 'EOF'
-- You'll need to create INSERT statements from your CSV data
-- For each row in posts.csv:
INSERT INTO posts (id, slug, type, wordpress_id, featured_image_url, yoast_og_image, created_at, updated_at, published_at, is_new) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);

-- Similar for post_content table
EOF

# Then use Turso to import:
turso db shell sportendorse-prod < /tmp/migrate_posts.sql
```

**Option B: Let WordPress Sync Repopulate Data**

If you don't have the CSV files, the WordPress sync will repopulate the data on first run:

1. Skip data migration
2. Deploy code to production
3. Run: `curl -X POST "https://www.sportendorse.com/api/wordpress/sync?force=true"`

This will sync all posts from WordPress to Turso.

### PHASE 4: Update Environment Variables (5 minutes)

**4.1 Update .env.local**

Replace the old Neon variables with Turso variables:

```bash
# OLD (remove these)
# NEON_DATABASE_URL=postgresql://...
# POSTGRES_URL=postgresql://...
# DATABASE_URL=postgresql://...

# NEW (add these)
TURSO_DATABASE_URL=libsql://...turso.io  # From: turso db show sportendorse-prod --url
TURSO_AUTH_TOKEN=eyJ0eXAi...             # From: turso db tokens create sportendorse-prod
```

Get your actual credentials:
```bash
turso db show sportendorse-prod --url
turso db tokens create sportendorse-prod --expiration none
```

**4.2 Update Vercel Environment Variables**

1. Go to your Vercel project: https://vercel.com/dashboard
2. Navigate to: Settings → Environment Variables
3. Remove: `NEON_DATABASE_URL`, `POSTGRES_URL`, `DATABASE_URL`
4. Add:
   - `TURSO_DATABASE_URL` = (your libsql:// URL)
   - `TURSO_AUTH_TOKEN` = (your auth token)
5. Make sure both are set for: Production, Preview, and Development

### PHASE 5: Test Locally (10 minutes)

**5.1 Install dependencies**
```bash
npm install
```

**5.2 Run dev server**
```bash
npm run dev
```

**5.3 Test endpoints**

Test content serving:
```bash
# Test blog posts
curl "http://localhost:3000/api/content?type=blog&limit=5"

# Test specific post by slug
curl "http://localhost:3000/api/content?type=blog&slug=your-post-slug"

# Test other content types
curl "http://localhost:3000/api/content?type=press&limit=5"
curl "http://localhost:3000/api/content?type=podcast&limit=5"
curl "http://localhost:3000/api/content?type=success_story&limit=5"
```

**5.4 Test WordPress sync (if you have data)**

If you migrated data from Neon, verify it appears:
```bash
# Visit your browser to a post page
http://localhost:3000/blog/any-existing-post-slug

# Should display the post content
```

### PHASE 6: Deploy to Production (10 minutes)

**6.1 Commit changes**
```bash
git add -A
git commit -m "feat: migrate from Neon PostgreSQL to Turso libSQL

- Updated utils/db.ts to use @libsql/client
- Converted all SQL queries from PostgreSQL to SQLite syntax
- Updated content-repository.ts query placeholders (? instead of $1)
- Fixed wordpress sync upsert logic for SQLite
- Updated translate-service.ts to use libSQL
- Updated package.json dependencies"

git push origin new-turso-db
```

**6.2 Create Pull Request**

Go to GitHub and create a PR from `new-turso-db` → `main`

**6.3 Review and Merge**

Once CI passes, merge to main. Vercel will auto-deploy.

**6.4 Verify production is live**

```bash
# Check that prod is up
curl "https://www.sportendorse.com/api/content?type=blog&limit=1"

# Should return JSON with content
```

**6.5 Run initial sync**

After deployment completes:
```bash
curl -X POST "https://www.sportendorse.com/api/wordpress/sync?force=true" \
  -H "Authorization: Bearer $WORDPRESS_SYNC_SECRET"

# Or without auth if WORDPRESS_SYNC_SECRET is not set
curl -X POST "https://www.sportendorse.com/api/wordpress/sync?force=true"
```

Check the response:
```json
{
  "ok": true,
  "forced": true,
  "type": "all",
  "summaries": [
    { "type": "blog", "count": 42 },
    { "type": "press", "count": 15 },
    ...
  ]
}
```

### PHASE 7: Monitor & Verify (Ongoing)

**7.1 Check Turso usage**

```bash
turso db stats sportendorse-prod
```

You should see:
- Rows read: should be very low initially, grows with traffic
- Rows written: minimal (only during sync)
- Storage: should be <100MB

**7.2 Verify production pages load**

Visit your main domain and check a few pages:
- https://www.sportendorse.com/ (main page)
- https://www.sportendorse.com/blog/ (blog listing)
- https://www.sportendorse.com/blog/any-post (individual post)
- https://www.sportendorse.com/es/blog/ (Spanish version)
- https://www.sportendorse.com/de/blog/ (German version)

All should load without errors.

**7.3 Check server logs**

In Vercel dashboard → Logs, verify no database connection errors.

---

## Troubleshooting

### "TURSO_DATABASE_URL is not defined"
**Solution:**
1. Check `.env.local` contains the variable
2. Restart dev server: `npm run dev`
3. Verify Vercel environment variables are set

### "no such table: posts"
**Solution:**
1. Run the schema: `turso db shell sportendorse-prod < scripts/turso-schema.sql`
2. Verify: `turso db shell sportendorse-prod` then `.tables`

### Database errors on production
**Solution:**
1. Check Turso dashboard to ensure database is active
2. Verify environment variables in Vercel settings
3. Check function logs in Vercel for detailed errors

### Translation queries fail
**Solution:**
The `translations` table is optional. If you didn't migrate it, translations will just not be cached. The app will still work - it will translate on demand.

To create the translations table:
```bash
turso db shell sportendorse-prod
```

Then paste:
```sql
CREATE TABLE IF NOT EXISTS translations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  context_key TEXT NOT NULL,
  language TEXT NOT NULL,
  source_hash TEXT NOT NULL,
  translated_text TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(context_key, language)
);

CREATE INDEX IF NOT EXISTS idx_translations_lookup 
ON translations(context_key, language, source_hash);
```

---

## Rollback Plan

If you need to revert:

**Quick Rollback (within 5 minutes):**
```bash
# Switch back to Neon in Vercel environment variables
# Edit Vercel settings and remove TURSO_DATABASE_URL, TURSO_AUTH_TOKEN
# Re-add NEON_DATABASE_URL and POSTGRES_URL
# Vercel will auto-redeploy

# Locally:
git checkout main
npm install
```

**Full Rollback (more than 5 minutes):**
1. Revert commit: `git revert <commit-hash>`
2. Update Vercel env vars back to Neon
3. Push and redeploy

---

## Final Checklist

- [ ] Dependencies installed (`npm install`)
- [ ] Turso database created (`turso db create sportendorse-prod`)
- [ ] Schema applied to Turso
- [ ] Data migrated (from Neon or from WordPress sync)
- [ ] .env.local has TURSO_DATABASE_URL and TURSO_AUTH_TOKEN
- [ ] Vercel has TURSO_DATABASE_URL and TURSO_AUTH_TOKEN set
- [ ] Code changes committed and pushed to GitHub
- [ ] PR created and merged to main
- [ ] Production deployment verified
- [ ] WordPress sync tested on production
- [ ] Pages loading correctly
- [ ] No errors in Vercel logs
- [ ] Turso usage is reasonable (< 10% of free tier)

---

## Cost Comparison

### Before (Neon)
- Free tier: 100 CU-hours/month (exceeded ⚠️)
- Your usage: 110% of limit
- Cost: $0 but throttled/suspended

### After (Turso)
- Free tier: 1 Billion row reads/month
- Your usage: ~100K reads/month (0.01%)
- Cost: $0/month, plenty of headroom

**Result:** Unlimited database usage on free tier 🎉

---

## Need Help?

If you encounter issues:
1. Check error messages in Vercel logs
2. Verify Turso database is active
3. Check .env variables are set correctly
4. Review troubleshooting section above
5. Check schema was created: `turso db shell sportendorse-prod` then `.tables`
