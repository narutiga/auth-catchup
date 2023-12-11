import type { AdapterAccount } from '@auth/core/adapters';
import { sql } from 'drizzle-orm';
import {
  index,
  int,
  mysqlTable,
  primaryKey,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/mysql-core';

export const users = mysqlTable('user', {
  id: varchar('id', { length: 255 }).notNull().primaryKey(),
  name: varchar('name', { length: 255 }),
  email: varchar('email', { length: 255 }).notNull().unique('ui_user_01'),
  emailVerified: timestamp('emailVerified').defaultNow(),
  image: varchar('image', { length: 255 }),
  created_at: timestamp('created_at', { mode: 'date', fsp: 6 })
    .notNull()
    .defaultNow(),
  updated_at: timestamp('updated_at', { mode: 'date', fsp: 6 })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`),
});

export const accounts = mysqlTable(
  'account',
  {
    userId: varchar('userId', { length: 255 }).notNull(),
    type: varchar('type', { length: 255 })
      .$type<AdapterAccount['type']>()
      .notNull(),
    provider: varchar('provider', { length: 255 }).notNull(),
    providerAccountId: varchar('providerAccountId', { length: 255 }).notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: int('expires_at'),
    token_type: varchar('token_type', { length: 255 }),
    scope: varchar('scope', { length: 255 }),
    id_token: text('id_token'),
    session_state: varchar('session_state', { length: 255 }),
    created_at: timestamp('created_at', { mode: 'date', fsp: 6 })
      .notNull()
      .defaultNow(),
    updated_at: timestamp('updated_at', { mode: 'date', fsp: 6 })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`),
  },
  (account) => ({
    compoundKey: primaryKey(account.provider, account.providerAccountId),
    userIdIndex: index('idx_account_01').on(account.userId),
  })
);

export const sessions = mysqlTable(
  'session',
  {
    sessionToken: varchar('sessionToken', { length: 255 })
      .notNull()
      .primaryKey(),
    userId: varchar('userId', { length: 255 }).notNull(),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
    created_at: timestamp('created_at', { mode: 'date', fsp: 6 })
      .notNull()
      .defaultNow(),
    updated_at: timestamp('updated_at', { mode: 'date', fsp: 6 })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`),
  },
  (session) => ({
    userIdIndex: index('idx_session_01').on(session.userId),
  })
);

export const verificationTokens = mysqlTable(
  'verificationToken',
  {
    identifier: varchar('identifier', { length: 255 }).notNull(),
    token: varchar('token', { length: 255 }).notNull(),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey(vt.identifier, vt.token),
  })
);
