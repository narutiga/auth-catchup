import { connect } from '@planetscale/database';
import { drizzle } from 'drizzle-orm/planetscale-serverless';
import { cwd } from 'node:process';
import { loadEnvConfig } from '@next/env';

loadEnvConfig(cwd());

const connection = connect({
  url: process.env.DATABASE_URL,
});

export const db = drizzle(connection);
