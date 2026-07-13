import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const sql = await getDb();
    const photos = await sql`SELECT * FROM gallery ORDER BY "addedAt" DESC`;
    return NextResponse.json(photos);
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to fetch gallery", details: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const sql = await getDb();
    const addedAt = new Date().toISOString();
    const caption = data.caption || "";
    const category = data.category || "other";
    const rows = await sql`
      INSERT INTO gallery (url, caption, category, "addedAt")
      VALUES (${data.url}, ${caption}, ${category}, ${addedAt})
      RETURNING id
    `;
    return NextResponse.json({ id: rows[0].id, url: data.url, caption, category, addedAt }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to add photo", details: error.message }, { status: 500 });
  }
}
