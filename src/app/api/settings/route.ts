import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const key = searchParams.get("key");
    const sql = await getDb();

    if (key) {
      const rows = await sql`SELECT value FROM settings WHERE key = ${key}`;
      return NextResponse.json(rows[0] ? JSON.parse(rows[0].value) : null);
    }

    const rows = await sql`SELECT * FROM settings`;
    return NextResponse.json(rows);
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to fetch settings", details: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { key, value } = await req.json();
    if (!key) return NextResponse.json({ error: "Key is required" }, { status: 400 });
    const sql = await getDb();
    const valueStr = typeof value === "string" ? value : JSON.stringify(value);
    await sql`
      INSERT INTO settings (key, value) VALUES (${key}, ${valueStr})
      ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value
    `;
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to update setting", details: error.message }, { status: 500 });
  }
}
