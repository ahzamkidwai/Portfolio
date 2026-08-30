import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

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

// A single transporter instance is reused across invocations (when the
// serverless function stays warm) instead of reconnecting on every request.
let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (transporter) return transporter;

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? 465);
  const secure = process.env.SMTP_SECURE !== "false"; // true unless explicitly disabled
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;

  if (!host || !user || !pass) return null;

  transporter = nodemailer.createTransport({
    host,
    port,
    secure, // true for port 465, false for 587/25 (STARTTLS)
    auth: { user, pass },
  });

  return transporter;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

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

  const { name, email, subject, message } = body as ContactPayload;

  const smtp = getTransporter();
  const fromAddress = process.env.EMAIL_FROM_ADDRESS;
  const toAddress = process.env.EMAIL_TO_ADDRESS;

  if (!smtp || !fromAddress || !toAddress) {
    // Not configured yet — log server-side so the message isn't silently
    // lost during local development, and tell the client it wasn't delivered.
    console.info("[contact] SMTP not configured. Message received:", body);
    return NextResponse.json(
      { ok: true, delivered: false, note: "Email delivery is not configured yet." },
      { status: 200 }
    );
  }

  try {
    await smtp.sendMail({
      from: `"${name}" <${fromAddress}>`, // must be an address the SMTP account is allowed to send as
      replyTo: `"${name}" <${email}>`, // lets you hit "Reply" and respond straight to the sender
      to: toAddress,
      subject: `Portfolio contact: ${subject}`,
      text: `From: ${name} <${email}>\nSubject: ${subject}\n\n${message}`,
      html: `
        <div style="font-family: sans-serif; font-size: 14px; color: #121214; line-height: 1.6;">
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true, delivered: true }, { status: 200 });
  } catch (err) {
    console.error("[contact] Failed to send email:", err);
    return NextResponse.json({ error: "Failed to send message. Please try again later." }, { status: 500 });
  }
}