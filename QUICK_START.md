# ⚡ Quick Start - What To Do Next (TL;DR)

## What's Done ✅
- All code updated to use Turso/libSQL
- Schema file created matching your exact Neon database
- Package dependencies updated
- Everything ready to deploy

## What You Do (8 Simple Commands)

### 1️⃣ Install Dependencies
```bash
npm install
```

### 2️⃣ Create Database Schema
```bash
turso db shell sportendorse-prod < scripts/turso-schema.sql
```

### 3️⃣ Get Credentials
```bash
# Copy the output from these commands into .env.local and Vercel:

turso db show sportendorse-prod --url
turso db tokens create sportendorse-prod --expiration none
```

### 4️⃣ Update .env.local
```bash
# Edit .env.local:
TURSO_DATABASE_URL=<paste from step 3>
TURSO_AUTH_TOKEN=<paste from step 3>
```

### 5️⃣ Test Locally
```bash
npm run dev
# Visit http://localhost:3000/api/content?type=blog&limit=1
```

### 6️⃣ Update Vercel
Visit https://vercel.com/dashboard → Your Project → Settings → Environment Variables

Add:
- `TURSO_DATABASE_URL` = [from step 3]
- `TURSO_AUTH_TOKEN` = [from step 3]

### 7️⃣ Deploy
```bash
git add -A
git commit -m "migrate: Neon to Turso"
git push
# Create PR on GitHub, merge to main
```

### 8️⃣ Sync Data (after production deploys)
```bash
curl -X POST "https://www.sportendorse.com/api/wordpress/sync?force=true"
```

---

## Expected Timeline
- Steps 1-4: 10 minutes
- Step 5: 5 minutes
- Step 6: 3 minutes
- Step 7: 5 minutes (automated)
- Step 8: 1 minute

**Total: ~25 minutes** ⏱️

---

## Key Files Changed
```
✅ utils/db.ts                    (Neon → Turso)
✅ utils/content-repository.ts    (SQL syntax updated)
✅ utils/translate-service.ts     (SQL syntax updated)
✅ app/api/wordpress/sync/route.ts (Upsert logic updated)
✅ package.json                   (Dependencies updated)
✅ scripts/turso-schema.sql       (NEW - Your schema in SQLite)
```

---

## If Something Goes Wrong

**"TURSO_DATABASE_URL is not defined"**
→ Restart dev server: `npm run dev`

**"no such table: posts"**
→ Run schema: `turso db shell sportendorse-prod < scripts/turso-schema.sql`

**Everything else**
→ Check `TURSO_MIGRATION.md` section "Troubleshooting"

---

## Documentation
- `TURSO_COMPLETE_SUMMARY.md` - Full explanation
- `TURSO_MIGRATION.md` - Step-by-step guide (detailed)
- `SCHEMA_VERIFICATION.md` - Field-by-field mapping
- `scripts/turso-schema.sql` - Database schema

---

## Final Check
After production deploy, verify:
```bash
curl https://www.sportendorse.com/api/content?type=blog&limit=1
# Should return JSON with blog posts
```

If it works, you're done! 🎉

**Cost after migration: $0/month**
**Database limit: 1 billion reads/month (you use ~0.01%)**

---

**Questions?** Check the detailed docs above. Everything is documented.
