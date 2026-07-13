import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const sql = await getDb();
    const bookings = await sql`SELECT * FROM bookings ORDER BY "receivedAt" DESC`;
    return NextResponse.json(bookings);
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to fetch bookings", details: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const sql = await getDb();
    const id = Date.now().toString() + Math.random().toString(36).substring(2);
    const receivedAt = new Date().toISOString();
    const rentalItemId = data.rentalItemId || null;
    const message = data.message || "";
    await sql`
      INSERT INTO bookings (id, name, phone, event_type, date, location, budget, message, status, "rentalItemId", "receivedAt")
      VALUES (${id}, ${data.name}, ${data.phone}, ${data.event_type}, ${data.date}, ${data.location}, ${data.budget}, ${message}, 'pending', ${rentalItemId}, ${receivedAt})
    `;
    return NextResponse.json({ id, ...data, status: "pending", receivedAt }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to create booking", details: error.message }, { status: 500 });
  }
}
