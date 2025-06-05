#!/usr/bin/env tsx

import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { eq } from 'drizzle-orm';
import { user } from '../lib/db/schema';

// ---- Parse CLI arguments ----

const args = Object.fromEntries(
  process.argv.slice(2).map(arg => {
    const [key, val] = arg.replace(/^--/, '').split('=');
    return [key, val];
  })
);

const email = args.email;
const is_admin = args.admin === 'true';
const pgurl = args.pgurl;

if (!email || typeof is_admin !== 'boolean' || !pgurl) {
  console.error(`❌ Usage: pnpm exec tsx scripts/set-admin.ts --email=foo@bar.com --admin=true --pgurl=postgres://...`);
  process.exit(1);
}

// ---- DB Setup ----

const client = postgres(pgurl, {
    ssl: process.env.NODE_ENV === 'production' ? 'require' : false,
  });
const db = drizzle(client);

// ---- Admin Status Update ----

async function setAdminStatus() {
  const result = await db
    .update(user)
    .set({ is_admin })
    .where(eq(user.email, email))
    .returning();

  if (result.length === 0) {
    console.warn(`⚠️ No user found with email: ${email}`);
  } else {
    console.log(`✅ Updated admin status for ${email} to ${is_admin}`);
  }
}

setAdminStatus().catch((err) => {
  console.error('❌ Error updating user:', err);
  process.exit(1);
});
