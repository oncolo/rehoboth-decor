import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const data = await req.json();
    const sql = await getDb();
    const price = Number(data.price);
    await sql`UPDATE rentals SET price = ${price} WHERE id = ${params.id}`;
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to update", details: error.message }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  try {
    const sql = await getDb();
    await sql`DELETE FROM rentals WHERE id = ${params.id}`;
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to delete", details: error.message }, { status: 500 });
  }
}
