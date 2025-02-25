import { sql } from 'drizzle-orm'
import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js'

export async function up(db: PostgresJsDatabase) {
  await db.execute(sql`
    ALTER TABLE "Chat" 
    ADD COLUMN "is_pinned" boolean NOT NULL DEFAULT false;
  `)
}

export async function down(db: PostgresJsDatabase) {
  await db.execute(sql`
    ALTER TABLE "Chat" 
    DROP COLUMN "is_pinned";
  `)
} 