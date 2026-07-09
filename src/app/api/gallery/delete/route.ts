import { del } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { url } = await req.json();
  if (!url) return NextResponse.json({ error: "No url" }, { status: 400 });

  await del(url);
  return NextResponse.json({ ok: true });
}
