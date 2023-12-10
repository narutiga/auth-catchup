import type { Config } from 'drizzle-kit';
import { cwd } from 'node:process';
import { loadEnvConfig } from '@next/env';

loadEnvConfig(cwd());

if (process.env.DATABASE_URL == null) {
  throw new Error('DATABASE_URL is missing');
}

export default {
  schema: './src/db/schema.ts',
  out: './src/db/migrations',
  driver: 'mysql2',
  dbCredentials: {
    uri: process.env.DATABASE_URL,
  },
} satisfies Config;
