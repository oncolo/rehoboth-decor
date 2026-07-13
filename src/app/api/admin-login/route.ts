import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();
    const sql = await getDb();
    const rows = await sql`SELECT * FROM admin_auth LIMIT 1`;
    const admin = rows[0];

    if (
      admin &&
      admin.username.trim().toLowerCase() === username?.trim().toLowerCase() &&
      admin.password === password?.trim()
    ) {
      const res = NextResponse.json({ success: true });
      res.cookies.set("admin_token", "authenticated", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 8,
        path: "/",
      });
      return res;
    }

    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  } catch (error: any) {
    return NextResponse.json({ error: "Auth failed", details: error.message }, { status: 500 });
  }
}
