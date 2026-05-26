import db from './connection.js';
import bcrypt from 'bcryptjs';

const { TEST_EMAIL, TEST_USERNAME, TEST_PASSWORD } = process.env;

await db.query(`
CREATE TABLE IF NOT EXISTS
  users (
    id SERIAL PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    username TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    reset_password_token TEXT,
    reset_password_expires_at TIMESTAMPTZ,
    is_admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

CREATE TABLE IF NOT EXISTS
  favorite_champions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    champion_id TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (user_id, champion_id)
  );
  `);

if (TEST_EMAIL && TEST_USERNAME && TEST_PASSWORD) {
  const isAdmin = true;
  const passwordHash = await bcrypt.hash(TEST_PASSWORD, 10);

  await db.query(
    `
    INSERT INTO users (email, username, password_hash, is_admin)
    VALUES ($1, $2, $3, $4)
    ON CONFLICT (email) DO NOTHING
    `,
    [TEST_EMAIL, TEST_USERNAME, passwordHash, isAdmin]
  );
}

console.log('db created and seeded.');
process.exit(0);
