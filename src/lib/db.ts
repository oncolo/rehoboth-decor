import { neon } from "@neondatabase/serverless";

function getSql() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set");
  return neon(url);
}

export async function getDb() {
  const sql = getSql();
  await sql`CREATE TABLE IF NOT EXISTS admin_auth (id SERIAL PRIMARY KEY, username TEXT NOT NULL, password TEXT NOT NULL)`;
  await sql`CREATE TABLE IF NOT EXISTS rentals (id TEXT PRIMARY KEY, name TEXT NOT NULL, description TEXT, price REAL NOT NULL, "imageUrl" TEXT NOT NULL, category TEXT NOT NULL, "createdAt" TEXT NOT NULL)`;
  await sql`CREATE TABLE IF NOT EXISTS gallery (id SERIAL PRIMARY KEY, url TEXT NOT NULL, caption TEXT, category TEXT NOT NULL, "addedAt" TEXT NOT NULL)`;
  await sql`CREATE TABLE IF NOT EXISTS bookings (id TEXT PRIMARY KEY, name TEXT NOT NULL, phone TEXT NOT NULL, event_type TEXT NOT NULL, date TEXT NOT NULL, location TEXT NOT NULL, budget TEXT NOT NULL, message TEXT, status TEXT NOT NULL, "rentalItemId" TEXT, "receivedAt" TEXT NOT NULL)`;
  await sql`CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY, value TEXT NOT NULL)`;
  await sql`CREATE TABLE IF NOT EXISTS voice_notes (id TEXT PRIMARY KEY, name TEXT NOT NULL, phone TEXT, message TEXT, audio_url TEXT, received_at TEXT NOT NULL, read BOOLEAN DEFAULT FALSE)`;

  const admins = await sql`SELECT id FROM admin_auth LIMIT 1`;
  if (admins.length === 0) {
    const username = process.env.ADMIN_USERNAME || "admin";
    const password = process.env.ADMIN_PASSWORD || "rehoboth2024";
    await sql`INSERT INTO admin_auth (username, password) VALUES (${username}, ${password})`;
  }

  const budgetRows = await sql`SELECT key FROM settings WHERE key = 'budget_ranges' LIMIT 1`;
  if (budgetRows.length === 0) {
    const defaultBudgets = JSON.stringify(["$1,000–$3,000", "$3,000–$5,000", "$5,000–$10,000", "$10,000+"]);
    await sql`INSERT INTO settings (key, value) VALUES ('budget_ranges', ${defaultBudgets})`;
  }

  return sql;
}

export type RentalItem = {
  id: string; name: string; description: string; price: number;
  imageUrl: string; category: string; createdAt: string;
};

export type BookingRequest = {
  id: string; name: string; phone: string; event_type: string;
  date: string; location: string; budget: string; message: string;
  status: string; rentalItemId?: string; receivedAt: string;
};

export type Photo = {
  id: number; url: string; caption: string; category: string; addedAt: string;
};
