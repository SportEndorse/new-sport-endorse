# Translation System Setup & Testing Guide

## Prerequisites

1. **Neon Postgres Database** - Connected via Vercel integration
2. **Database Table** - Already created (you mentioned running the CREATE TABLE command)
3. **Environment Variables** - Need to be set up

## Setup Steps

### 1. Environment Variables

Create a `.env.local` file in the root directory with your Postgres connection string:

```bash
# .env.local
POSTGRES_URL="your-neon-postgres-connection-string"
```

**For Vercel Integration:**
If you've connected Neon Postgres via Vercel integration, the environment variables are automatically available in production. For local development, you can:

- **Option A:** Get the connection string from your Neon dashboard
- **Option B:** Use Vercel CLI to pull environment variables:
  ```bash
  npm i -g vercel
  vercel env pull .env.local
  ```

**Connection String Format:**
```
postgresql://username:password@hostname/database?sslmode=require
```

### 2. Verify Database Table

Make sure the `translations` table exists in your Neon database. If not, run:

```sql
CREATE TABLE IF NOT EXISTS translations (
  id SERIAL PRIMARY KEY,
  context_key VARCHAR(255) NOT NULL,
  language VARCHAR(10) NOT NULL,
  source_hash VARCHAR(64) NOT NULL,
  translated_text TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(context_key, language)
);

CREATE INDEX IF NOT EXISTS idx_translations_lookup 
ON translations(context_key, language, source_hash);
```

### 3. Install Dependencies

All required packages are already in `package.json`. Just make sure they're installed:

```bash
npm install
```

## Testing the Translation System

### Step 1: Start the Development Server

```bash
npm run dev
```

The server will start on `http://localhost:3000`

### Step 2: Test Translation Flow

#### Test 1: Spanish Translation

1. Navigate to a blog post in Spanish:
   ```
   http://localhost:3000/es/blog/[any-blog-slug]
   ```
   Replace `[any-blog-slug]` with an actual blog post slug from your WordPress site.

2. **What to expect:**
   - First visit: You'll see "Traduciendo..." (Translating...) briefly
   - The post content (title, excerpt, body) will be translated to Spanish
   - Subsequent visits: Translation loads instantly from cache

#### Test 2: German Translation

1. Navigate to a blog post in German:
   ```
   http://localhost:3000/de/blog/[any-blog-slug]
   ```

2. **What to expect:**
   - First visit: You'll see "Übersetzen..." (Translating...) briefly
   - The post content will be translated to German
   - Subsequent visits: Instant load from cache

#### Test 3: Test Different Content Types

Try these URLs:
- **Blog Posts:** `/es/blog/[slug]` or `/de/blog/[slug]`
- **Podcasts:** `/es/podcasts/[slug]` or `/de/podcasts/[slug]`
- **News Stories:** `/es/presses/[slug]` or `/de/presses/[slug]`
- **Success Stories:** `/es/success-stories/[slug]` or `/de/success-stories/[slug]`

### Step 3: Verify Database Caching

1. **Check the database:**
   ```sql
   SELECT * FROM translations 
   ORDER BY created_at DESC 
   LIMIT 10;
   ```

2. **You should see:**
   - `context_key`: e.g., `post-my-blog-post-title`
   - `language`: `es` or `de`
   - `source_hash`: SHA-256 hash of the English content
   - `translated_text`: The translated content
   - `created_at`: Timestamp of when it was cached

### Step 4: Test API Directly (Optional)

You can test the translation API directly using curl or Postman:

```bash
curl -X POST http://localhost:3000/api/translate \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Hello, this is a test.",
    "language": "es",
    "contextKey": "test-hello"
  }'
```

Expected response:
```json
{
  "translated": "Hola, esto es una prueba."
}
```

## Troubleshooting

### Issue: "Cannot find module '@vercel/postgres'"

**Solution:**
```bash
npm install @vercel/postgres @neondatabase/serverless
```

### Issue: Database Connection Error

**Check:**
1. `.env.local` file exists and has `POSTGRES_URL`
2. Connection string is correct
3. Database is accessible (check Neon dashboard)

**Test connection:**
```bash
node -e "require('@vercel/postgres').sql`SELECT 1`"
```

### Issue: Translation Not Working

**Check browser console for errors:**
1. Open DevTools (F12)
2. Check Console tab for errors
3. Check Network tab - look for `/api/translate` requests

**Common issues:**
- **Network error:** Check if API route is accessible
- **Translation error:** Google Translate might be rate-limiting (wait a few minutes)
- **Database error:** Check Postgres connection

### Issue: Translations Not Caching

**Verify:**
1. Database table exists and has correct schema
2. Check database logs for INSERT errors
3. Verify `UNIQUE(context_key, language)` constraint is working

## Expected Behavior

### First Visit (No Cache)
1. User visits `/es/blog/my-post`
2. Component loads English post
3. Component calls `/api/translate`
4. API checks database → not found
5. API calls Google Translate → translates content
6. API saves to database
7. Component displays translated content
8. **Time:** ~2-5 seconds (depending on content length)

### Subsequent Visits (Cached)
1. User visits `/es/blog/my-post` again
2. Component loads English post
3. Component calls `/api/translate`
4. API checks database → **found!**
5. API returns cached translation immediately
6. Component displays translated content
7. **Time:** < 1 second

## Monitoring

### Check Translation Cache Size

```sql
SELECT language, COUNT(*) as count 
FROM translations 
GROUP BY language;
```

### Check Recent Translations

```sql
SELECT context_key, language, created_at 
FROM translations 
ORDER BY created_at DESC 
LIMIT 20;
```

## Production Deployment

When deploying to Vercel:

1. **Environment Variables** are automatically available if Neon is connected via Vercel integration
2. **No additional setup needed** - the system works the same way
3. **First translations** will be slower (no cache), then instant

## Notes

- **Free Google Translate:** Uses the free web interface, so it's rate-limited
- **Just-in-Time:** Translations happen only when users visit pages
- **Graceful Fallback:** If translation fails, English content is shown
- **No Cookies:** GDPR/CCPA compliant - uses URL-based language preference

