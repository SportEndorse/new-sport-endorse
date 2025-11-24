# Quick Setup Checklist

## ✅ Required Setup (Before Testing)

### 1. Environment Variables
Create `.env.local` in the root directory:

```bash
POSTGRES_URL="your-neon-postgres-connection-string"
```

**How to get your connection string:**
- Go to your Neon dashboard → Select your database → Connection Details
- Copy the connection string (it looks like: `postgresql://user:pass@host/db?sslmode=require`)

**OR** if using Vercel integration:
```bash
npm i -g vercel
vercel env pull .env.local
```

### 2. Database Table (Already Done ✅)
You mentioned you already ran the CREATE TABLE command. If not, run this in your Neon SQL editor:

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

### 3. Dependencies (Already Installed ✅)
All packages are installed. No action needed.

## 🚀 Testing Steps

### Step 1: Start Dev Server
```bash
npm run dev
```

### Step 2: Test Spanish Translation
1. Visit: `http://localhost:3000/es/blog/[any-blog-slug]`
   - Replace `[any-blog-slug]` with a real blog post slug
   - Example: `http://localhost:3000/es/blog/your-post-slug`

2. **Expected:**
   - Brief "Traduciendo..." message
   - Post content appears in Spanish
   - Check browser console (F12) for any errors

### Step 3: Test German Translation
1. Visit: `http://localhost:3000/de/blog/[any-blog-slug]`

2. **Expected:**
   - Brief "Übersetzen..." message  
   - Post content appears in German

### Step 4: Verify Caching
Visit the same Spanish/German URL again - it should load instantly (no translation delay) because it's cached.

## 🔍 Quick Verification

### Check if Environment Variable is Set
```bash
# Windows PowerShell
$env:POSTGRES_URL

# Or check .env.local exists
cat .env.local
```

### Test Database Connection (Optional)
Create a test file `test-db.js`:
```javascript
import { sql } from '@vercel/postgres';

async function test() {
  try {
    const result = await sql`SELECT 1 as test`;
    console.log('✅ Database connected!', result.rows);
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
  }
}

test();
```

Run: `node test-db.js`

## 🐛 Common Issues

### "POSTGRES_URL is not defined"
- Make sure `.env.local` exists in the root directory
- Restart the dev server after creating `.env.local`

### "Translation not working"
- Check browser console (F12) for errors
- Check Network tab - look for `/api/translate` requests
- Verify the API route is accessible: `http://localhost:3000/api/translate`

### "Database error"
- Verify your `POSTGRES_URL` is correct
- Check Neon dashboard - is the database active?
- Make sure the `translations` table exists

## 📝 What Happens When You Test

1. **First Visit:**
   - English post loads from WordPress
   - Translation API is called
   - Google Translate translates the content (takes 2-5 seconds)
   - Translation is saved to Postgres database
   - Translated content is displayed

2. **Second Visit:**
   - English post loads from WordPress
   - Translation API checks database
   - Cached translation is found instantly
   - Translated content is displayed immediately

## 🎯 Success Indicators

✅ You'll know it's working when:
- Spanish/German pages show translated content
- First visit takes a few seconds (translating)
- Second visit is instant (cached)
- No errors in browser console
- Database has entries in `translations` table

