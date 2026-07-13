import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  try {
    const sql = await getDb();
    const id = Number(params.id);
    await sql`DELETE FROM gallery WHERE id = ${id}`;
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to delete photo", details: error.message }, { status: 500 });
  }
}
