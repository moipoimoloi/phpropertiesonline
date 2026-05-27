import { NextResponse } from "next/server";
import { inquirySchema, type InquiryInput } from "@/lib/inquiry-schema";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const RESEND_TIMEOUT_MS = 8_000;
const RESEND_MAX_ATTEMPTS = 2;

// Strip CR/LF and other control chars that could enable header injection
// when interpolated into subject / reply_to / from headers.
function sanitizeHeader(value: string): string {
  return value.replace(/[\r\n\t\0]+/g, " ").trim();
}

function redactEmail(email: string): string {
  const [user, domain] = email.split("@");
  if (!domain || !user) return "***";
  const masked = user.length <= 2 ? "**" : `${user[0]}***${user[user.length - 1]}`;
  return `${masked}@${domain}`;
}

function redactPayload(input: InquiryInput) {
  return {
    firstName: input.firstName ? `${input.firstName[0]}***` : "",
    lastName: input.lastName ? `${input.lastName[0]}***` : "",
    email: redactEmail(input.email),
    mobile: input.mobile ? `***${input.mobile.slice(-4)}` : "",
    interest: input.interest,
    messageLength: input.message.length
  };
}

async function sendViaResend(opts: {
  apiKey: string;
  from: string;
  to: string;
  replyTo: string;
  subject: string;
  text: string;
}): Promise<{ ok: true } | { ok: false; status: number; detail: string }> {
  for (let attempt = 1; attempt <= RESEND_MAX_ATTEMPTS; attempt++) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), RESEND_TIMEOUT_MS);
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        signal: controller.signal,
        headers: {
          Authorization: `Bearer ${opts.apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          from: opts.from,
          to: [opts.to],
          reply_to: opts.replyTo,
          subject: opts.subject,
          text: opts.text
        })
      });
      clearTimeout(timer);
      if (res.ok) return { ok: true };
      // Retry only on 5xx
      if (res.status < 500 || attempt === RESEND_MAX_ATTEMPTS) {
        const detail = await res.text().catch(() => "");
        return { ok: false, status: res.status, detail };
      }
    } catch (err) {
      clearTimeout(timer);
      if (attempt === RESEND_MAX_ATTEMPTS) {
        const detail = err instanceof Error ? err.message : String(err);
        return { ok: false, status: 0, detail };
      }
    }
    // backoff before retry
    await new Promise((r) => setTimeout(r, 500 * attempt));
  }
  return { ok: false, status: 0, detail: "exhausted retries" };
}

const GENERIC_SUBMIT_ERROR =
  "We couldn't send your inquiry right now. Please try again, or reach out by phone or email.";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "We couldn't read that submission. Please try again." }, { status: 400 });
  }

  const parsed = inquirySchema.safeParse(body);
  if (!parsed.success) {
    // Zod messages are written for end-users (e.g. "First name is required").
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Please check the form and try again." },
      { status: 400 }
    );
  }

  // Honeypot tripped — silently succeed without sending.
  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  const inquiry = parsed.data;
  const to = process.env.INQUIRY_TO_EMAIL;
  const from = process.env.INQUIRY_FROM_EMAIL;
  const resendKey = process.env.RESEND_API_KEY;

  if (!to || !from) {
    console.error("[inquiry] INQUIRY_TO_EMAIL or INQUIRY_FROM_EMAIL missing");
    return NextResponse.json({ error: GENERIC_SUBMIT_ERROR }, { status: 503 });
  }

  const subject = sanitizeHeader(`New inquiry — ${inquiry.firstName} ${inquiry.lastName} · ${inquiry.interest}`);
  const replyTo = sanitizeHeader(inquiry.email);
  const text = [
    `Name: ${inquiry.firstName} ${inquiry.lastName}`,
    `Email: ${inquiry.email}`,
    `Mobile: ${inquiry.mobile}`,
    `Interested in: ${inquiry.interest}`,
    "",
    inquiry.message
  ].join("\n");

  if (!resendKey) {
    // Local-dev fallback: never log PII to stdout.
    console.log("[inquiry] RESEND_API_KEY not set — accepting inquiry without delivery", redactPayload(inquiry));
    return NextResponse.json({ ok: true, delivered: false });
  }

  const result = await sendViaResend({ apiKey: resendKey, from, to, replyTo, subject, text });
  if (result.ok) {
    return NextResponse.json({ ok: true, delivered: true });
  }

  console.error("[inquiry] Resend failed", { status: result.status, detail: result.detail });
  return NextResponse.json({ error: GENERIC_SUBMIT_ERROR }, { status: 502 });
}
