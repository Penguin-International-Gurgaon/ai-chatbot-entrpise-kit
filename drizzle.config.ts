import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

// Load environment variables from multiple sources
config({
  path: '.env.local',
});
config({
  path: '.env',
});

export default defineConfig({
  schema: './lib/db/schema.ts',
  out: './lib/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    // Try POSTGRES_URL first, then DATABASE_URL for compatibility
    // biome-ignore lint: Forbidden non-null assertion.
    url: process.env.POSTGRES_URL || process.env.DATABASE_URL!,
  },
});
