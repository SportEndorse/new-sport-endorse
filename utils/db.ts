import { createClient } from '@libsql/client';

/**
 * Shared Turso/libSQL client factory so we only create one connection per runtime.
 * Uses HTTP protocol for compatibility with Vercel serverless functions.
 */
type TursoClient = ReturnType<typeof createClient>;

let cachedDb: TursoClient | null = null;

export function getDb() {
  if (cachedDb) return cachedDb;

  const url = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;

  if (!url) {
    throw new Error('Missing TURSO_DATABASE_URL environment variable.');
  }

  if (!authToken) {
    throw new Error('Missing TURSO_AUTH_TOKEN environment variable.');
  }

  cachedDb = createClient({
    url,
    authToken,
  });

  return cachedDb;
}

/**
 * Helper to execute SQL with named or positional parameters.
 * libSQL uses ? for positional parameters (not $1, $2 like PostgreSQL).
 *
 * Usage:
 *   const result = await executeSql('SELECT * FROM posts WHERE id = ?', [123]);
 */
export async function executeSql(sql: string, params: any[] = []) {
  const db = getDb();
  const result = await db.execute({
    sql,
    args: params,
  });
  return result.rows;
}

/**
 * Helper to handle multiple SQL executions in a transaction (when needed).
 * Note: Turso has transaction support via execute() with multiple statements.
 */
export async function executeTransaction(statements: Array<{ sql: string; args?: any[] }>) {
  const db = getDb();
  
  for (const stmt of statements) {
    await db.execute({
      sql: stmt.sql,
      args: stmt.args || [],
    });
  }
}
