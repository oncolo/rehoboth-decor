import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, phone, date, location, budget, event_type, message } = body;

  const resend = new Resend(process.env.RESEND_API_KEY);

  const { error } = await resend.emails.send({
    from: "Rehoboth Decor <onboarding@resend.dev>",
    to: "danielaberabetrewerik@gmail.com",
    subject: `New Booking — ${event_type} (${name})`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#f9f9f9;border-radius:12px;">
        <h2 style="color:#c9982a;font-family:Georgia,serif;margin-bottom:24px;">New Booking Request</h2>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:8px 0;color:#666;width:140px;">Name</td><td style="padding:8px 0;font-weight:600;">${name}</td></tr>
          <tr><td style="padding:8px 0;color:#666;">Phone</td><td style="padding:8px 0;font-weight:600;">${phone}</td></tr>
          <tr><td style="padding:8px 0;color:#666;">Event Type</td><td style="padding:8px 0;font-weight:600;">${event_type}</td></tr>
          <tr><td style="padding:8px 0;color:#666;">Event Date</td><td style="padding:8px 0;font-weight:600;">${date}</td></tr>
          <tr><td style="padding:8px 0;color:#666;">Location</td><td style="padding:8px 0;font-weight:600;">${location}</td></tr>
          <tr><td style="padding:8px 0;color:#666;">Budget</td><td style="padding:8px 0;font-weight:600;">${budget}</td></tr>
          ${message ? `<tr><td style="padding:8px 0;color:#666;vertical-align:top;">Message</td><td style="padding:8px 0;">${message}</td></tr>` : ""}
        </table>
        <p style="margin-top:24px;color:#999;font-size:12px;">Sent from rehoboth-decor.vercel.app</p>
      </div>
    `,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
