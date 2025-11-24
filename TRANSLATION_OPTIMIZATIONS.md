# Translation System Cost Optimizations

This document explains the optimizations implemented to reduce Vercel function costs for the translation system.

## Cost Reduction Strategies

### 1. Client-Side Caching (localStorage)
**Impact: HIGH** - Eliminates API calls for repeat visitors

- **What it does**: Caches translated content in the browser's localStorage
- **Cost savings**: If a user visits the same page twice, the second visit requires **zero API calls**
- **Cache duration**: 7 days
- **Storage management**: Automatically cleans up old entries (keeps last 100)

**Example:**
- First visit to `/es/blog/my-post`: 1 API call
- Second visit (same browser): 0 API calls (served from localStorage)

### 2. Batch API Endpoint
**Impact: HIGH** - Reduces function invocations for list pages

- **What it does**: Translates multiple posts in a single API call instead of N separate calls
- **Cost savings**: For a list page showing 12 posts:
  - **Before**: 12 function invocations
  - **After**: 1 function invocation
- **Location**: `/api/translate/batch`

**Example:**
- Blog list page with 12 posts:
  - Before: 12 separate API calls = 12 function invocations
  - After: 1 batch API call = 1 function invocation

### 3. Optimized Database Queries
**Impact: MEDIUM** - Reduces database query time and costs

- **What it does**: Batch lookups for multiple translation fields in a single query
- **Cost savings**: Faster function execution = lower compute costs
- **Implementation**: `getCachedTranslationsBatch()` function

**Example:**
- Translating a post with title, excerpt, and content:
  - Before: 3 separate database queries
  - After: 1 batch database query

### 4. Reduced Delays
**Impact: LOW-MEDIUM** - Faster function execution

- **What it does**: Reduced delays between field translations from 500ms to 300ms
- **Cost savings**: Faster execution = lower compute time costs
- **Note**: Delays are only needed when actually calling Google Translate API (not when using cache)

### 5. Early Returns
**Impact: MEDIUM** - Avoids unnecessary processing

- **What it does**: Returns immediately if all content is already cached
- **Cost savings**: Zero function execution time for cached content

## Expected Cost Reduction

### Before Optimizations
- **List page (12 posts)**: ~12 function invocations × ~3-5 seconds = 36-60 seconds of compute time
- **Detail page**: ~1 function invocation × ~3-5 seconds = 3-5 seconds of compute time
- **Repeat visitor**: Same as first visit (no caching)

### After Optimizations
- **List page (12 posts, first visit)**: ~1 function invocation × ~5-8 seconds = 5-8 seconds of compute time
- **List page (12 posts, cached)**: 0 function invocations (client-side cache)
- **Detail page (first visit)**: ~1 function invocation × ~3-5 seconds = 3-5 seconds
- **Detail page (cached)**: 0 function invocations (client-side cache)

### Estimated Savings
- **First-time visitors**: ~70% reduction in function invocations (batch API)
- **Repeat visitors**: ~95% reduction (client-side cache)
- **Overall**: Depending on traffic patterns, expect **60-80% reduction** in function costs

## How It Works

### Translation Flow (Optimized)

1. **Client checks localStorage cache**
   - If found → Return immediately (0 API calls)
   - If not found → Continue to step 2

2. **Client checks if multiple posts need translation**
   - Single post → Use `/api/translate`
   - Multiple posts → Use `/api/translate/batch`

3. **API checks database cache**
   - If all fields cached → Return immediately
   - If some fields cached → Only translate missing fields

4. **Save translations**
   - Database cache (for all users)
   - localStorage cache (for this user)

## Cache Invalidation

- **Database cache**: Invalidated when content hash changes (automatic)
- **localStorage cache**: 
  - Expires after 7 days
  - Invalidated when content hash changes
  - Automatically cleaned up (keeps last 100 entries)

## Monitoring

To monitor cache effectiveness:

1. **Check browser console**: Look for cache hits/misses
2. **Check Vercel function logs**: Should see fewer invocations
3. **Check database**: Query translation table to see cache growth

```sql
-- Check cache size
SELECT language, COUNT(*) as count 
FROM translations 
GROUP BY language;

-- Check recent cache hits (translations saved)
SELECT context_key, language, created_at 
FROM translations 
ORDER BY created_at DESC 
LIMIT 20;
```

## Notes

- Client-side cache is per-browser (not shared across devices)
- Database cache is shared across all users
- Cache cleanup is automatic and won't impact performance
- If localStorage quota is exceeded, old entries are automatically removed

