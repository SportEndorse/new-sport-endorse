import { neon } from '@neondatabase/serverless';

/**
 * Shared Neon client factory so we only create one SQL executor per runtime.
 */
type NeonClient = ReturnType<typeof neon>;

let cachedSql: NeonClient | null = null;

export function getDb() {
  if (cachedSql) return cachedSql;

  const connectionString =
    process.env.NEON_DATABASE_URL ||
    process.env.POSTGRES_URL ||
    process.env.POSTGRES_PRISMA_URL ||
    process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error('Missing database connection string. Set NEON_DATABASE_URL or POSTGRES_URL.');
  }

  cachedSql = neon(connectionString);
  return cachedSql;
}
