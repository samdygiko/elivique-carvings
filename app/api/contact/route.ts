import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let data: { name?: string; email?: string; phone?: string; message?: string };
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = (data.name || "").trim();
  const email = (data.email || "").trim();
  const phone = (data.phone || "").trim();
  const message = (data.message || "").trim();

  if (!name || !email) {
    return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Email is not configured." }, { status: 500 });
  }

  const resend = new Resend(apiKey);

  const text = [
    `New commission enquiry — Elivique Carvings`,
    ``,
    `Name:  ${name}`,
    `Email: ${email}`,
    `Phone: ${phone || "—"}`,
    ``,
    `About the piece:`,
    message || "—",
  ].join("\n");

  try {
    const { error } = await resend.emails.send({
      from: "Elivique Carvings <onboarding@resend.dev>",
      to: "onboarding@resend.dev",
      reply_to: email,
      subject: `Commission enquiry — ${name}`,
      text,
    });
    if (error) {
      return NextResponse.json({ error: "Could not send." }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Could not send." }, { status: 502 });
  }
}
