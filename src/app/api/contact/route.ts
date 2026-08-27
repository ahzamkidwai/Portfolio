import { NextRequest, NextResponse } from "next/server";

interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

function validate(body: Partial<ContactPayload>): string | null {
  if (!body.name?.trim()) return "Name is required.";
  if (!body.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
    return "A valid email is required.";
  }
  if (!body.subject?.trim()) return "Subject is required.";
  if (!body.message?.trim() || body.message.trim().length < 10) {
    return "Message must be at least 10 characters.";
  }
  return null;
}

/**
 * This route intentionally does not couple to a specific email provider.
 * Plug in any provider here (Resend, SendGrid, Postmark, Nodemailer + SMTP)
 * using server-side environment variables — never expose provider API keys
 * to the client. See .env.example for the expected variable names.
 */
export async function POST(request: NextRequest) {
  let body: Partial<ContactPayload>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const validationError = validate(body);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 422 });
  }

  const apiKey = process.env.EMAIL_PROVIDER_API_KEY;

  if (!apiKey) {
    // No email provider configured yet — log server-side so the message
    // isn't silently lost during local development, and let the client
    // know the request was received but not yet delivered.
    console.info("[contact] No EMAIL_PROVIDER_API_KEY configured. Message:", body);
    return NextResponse.json(
      { ok: true, delivered: false, note: "Email provider not configured yet." },
      { status: 200 }
    );
  }

  try {
    // Example integration point — replace with your provider's SDK/API call.
    // await resend.emails.send({
    //   from: process.env.EMAIL_FROM_ADDRESS!,
    //   to: process.env.EMAIL_TO_ADDRESS!,
    //   subject: `Portfolio contact: ${body.subject}`,
    //   text: `From: ${body.name} <${body.email}>\n\n${body.message}`,
    // });

    return NextResponse.json({ ok: true, delivered: true }, { status: 200 });
  } catch (err) {
    console.error("[contact] Failed to send email:", err);
    return NextResponse.json({ error: "Failed to send message. Please try again later." }, { status: 500 });
  }
}
