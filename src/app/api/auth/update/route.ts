import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function PUT(req: Request) {
  try {
    const { currentPassword, newUsername, newPassword } = await req.json();
    const sql = await getDb();
    const rows = await sql`SELECT * FROM admin_auth LIMIT 1`;
    const admin = rows[0];
    if (!admin || admin.password !== currentPassword) {
      return NextResponse.json({ error: "Current password is incorrect" }, { status: 401 });
    }
    const finalUsername = newUsername || admin.username;
    const finalPassword = newPassword || admin.password;
    await sql`UPDATE admin_auth SET username = ${finalUsername}, password = ${finalPassword} WHERE id = ${admin.id}`;
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to update auth", details: error.message }, { status: 500 });
  }
}
