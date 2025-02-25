import { sql } from 'drizzle-orm'
import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js'

export async function up(db: PostgresJsDatabase) {
  await db.execute(sql`
    ALTER TABLE "Message" 
    ADD COLUMN "is_bookmarked" boolean NOT NULL DEFAULT false;
  `)
}

export async function down(db: PostgresJsDatabase) {
  await db.execute(sql`
    ALTER TABLE "Message" 
    DROP COLUMN "is_bookmarked";
  `)
} 