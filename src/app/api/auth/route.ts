import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();
    const sql = await getDb();
    const rows = await sql`SELECT * FROM admin_auth LIMIT 1`;
    const admin = rows[0];
    if (admin && admin.username.toLowerCase() === username?.trim().toLowerCase() && admin.password === password?.trim()) {
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  } catch (error: any) {
    return NextResponse.json({ error: "Auth failed", details: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const sql = await getDb();
    const rows = await sql`SELECT id, username FROM admin_auth LIMIT 1`;
    return NextResponse.json({ admin: rows[0] ?? null });
  } catch (error: any) {
    return NextResponse.json({ error: "DB Error", details: error.message }, { status: 500 });
  }
}
