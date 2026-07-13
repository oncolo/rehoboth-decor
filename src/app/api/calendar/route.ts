import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function parseICalDates(icsData: string): string[] {
  const dates = new Set<string>();
  const lines = icsData.split(/\r?\n/);
  let inEvent = false, startStr = "", endStr = "";
  for (const line of lines) {
    if (line.startsWith("BEGIN:VEVENT")) { inEvent = true; startStr = ""; endStr = ""; }
    else if (line.startsWith("END:VEVENT")) {
      inEvent = false;
      if (startStr) {
        const m = startStr.match(/(\d{4})(\d{2})(\d{2})/);
        if (m) {
          const s = new Date(Date.UTC(+m[1], +m[2] - 1, +m[3]));
          dates.add(s.toISOString().split("T")[0]);
          if (endStr) {
            const e = endStr.match(/(\d{4})(\d{2})(\d{2})/);
            if (e) {
              const end = new Date(Date.UTC(+e[1], +e[2] - 1, +e[3]));
              const cur = new Date(s);
              cur.setUTCDate(cur.getUTCDate() + 1);
              while (cur < end) { dates.add(cur.toISOString().split("T")[0]); cur.setUTCDate(cur.getUTCDate() + 1); }
            }
          }
        }
      }
    } else if (inEvent) {
      if (line.startsWith("DTSTART")) startStr = line.split(":")[1] || "";
      else if (line.startsWith("DTEND")) endStr = line.split(":")[1] || "";
    }
  }
  return Array.from(dates);
}

export async function GET() {
  try {
    const sql = await getDb();

    const [manualRow] = await sql`SELECT value FROM settings WHERE key = 'manual_booked_dates'`;
    let manualDates: string[] = [];
    if (manualRow?.value) {
      try { manualDates = JSON.parse(manualRow.value); } catch { manualDates = []; }
    }

    const [icalRow] = await sql`SELECT value FROM settings WHERE key = 'ical_url'`;
    let icalDates: string[] = [];
    if (icalRow?.value) {
      try {
        const url = JSON.parse(icalRow.value);
        if (typeof url === "string" && url.trim()) {
          const res = await fetch(url.trim(), { next: { revalidate: 300 } });
          if (res.ok) icalDates = parseICalDates(await res.text());
        }
      } catch { /* ignore */ }
    }

    return NextResponse.json({ dates: Array.from(new Set([...manualDates, ...icalDates])) });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to fetch calendar data", details: error.message }, { status: 500 });
  }
}
