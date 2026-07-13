import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const sql = await getDb();
    const rentals = await sql`SELECT * FROM rentals ORDER BY "createdAt" DESC`;
    return NextResponse.json(rentals);
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to fetch rentals", details: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const sql = await getDb();
    const id = Date.now().toString() + Math.random().toString(36).substring(2);
    const createdAt = new Date().toISOString();
    const price = Number(data.price);
    const description = data.description || "";
    const category = data.category || "other";
    await sql`
      INSERT INTO rentals (id, name, description, price, "imageUrl", category, "createdAt")
      VALUES (${id}, ${data.name}, ${description}, ${price}, ${data.imageUrl}, ${category}, ${createdAt})
    `;
    return NextResponse.json({ id, ...data, price, description, category, createdAt }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to create rental", details: error.message }, { status: 500 });
  }
}
