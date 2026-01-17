import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/email/resend";

type ContactCategory = "question" | "suggestion" | "complaint";

const CATEGORY_LABEL: Record<ContactCategory, string> = {
  question: "Question",
  suggestion: "Suggestion",
  complaint: "Complaint",
};

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

function getClientIp(req: NextRequest) {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]?.trim() || "unknown";
  return req.headers.get("x-real-ip") || "unknown";
}

function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function isValidEmail(email: string) {
  // Good-enough validation for contact form use.
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function jsonError(status: number, error: string) {
  return NextResponse.json({ success: false, error }, { status });
}

export async function POST(request: NextRequest) {
  const toEmail = process.env.CONTACT_TO_EMAIL;
  if (!toEmail) {
    console.error("CONTACT_TO_EMAIL is not configured");
    return jsonError(500, "Contact email is not configured.");
  }

  // Best-effort rate limiting (per IP, in-memory)
  const ip = getClientIp(request);
  const now = Date.now();
  const rl = rateLimitStore.get(ip);
  if (!rl || now >= rl.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + WINDOW_MS });
  } else {
    rl.count += 1;
    if (rl.count > MAX_PER_WINDOW) {
      return jsonError(429, "Too many requests. Please try again later.");
    }
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonError(400, "Invalid request body.");
  }

  const payload = body as Partial<{
    name: string;
    email: string;
    category: ContactCategory;
    subject: string;
    message: string;
    website: string; // honeypot
  }>;

  // Honeypot: if filled, pretend success but do nothing.
  if ((payload.website || "").trim().length > 0) {
    return NextResponse.json({ success: true });
  }

  const name = (payload.name || "").trim();
  const email = (payload.email || "").trim();
  const category = payload.category || "question";
  const subject = (payload.subject || "").trim();
  const message = (payload.message || "").trim();

  if (!email || !isValidEmail(email)) return jsonError(400, "Please enter a valid email.");
  if (!subject || subject.length < 3) return jsonError(400, "Subject is too short.");
  if (subject.length > 140) return jsonError(400, "Subject is too long.");
  if (!message || message.length < 10) return jsonError(400, "Message is too short.");
  if (message.length > 5000) return jsonError(400, "Message is too long.");
  if (name.length > 80) return jsonError(400, "Name is too long.");
  if (!Object.keys(CATEGORY_LABEL).includes(category)) {
    return jsonError(400, "Invalid category.");
  }

  const userAgent = request.headers.get("user-agent") || "unknown";
  const categoryLabel = CATEGORY_LABEL[category];

  const safeName = escapeHtml(name || "(not provided)");
  const safeEmail = escapeHtml(email);
  const safeSubject = escapeHtml(subject);
  const safeMessage = escapeHtml(message);
  const safeIp = escapeHtml(ip);
  const safeUserAgent = escapeHtml(userAgent);

  const fullSubject = `[Contact] ${categoryLabel}: ${subject}`;

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #111827;">
      <h2 style="margin: 0 0 12px;">New contact form message</h2>
      <p style="margin: 0 0 12px; color: #374151;">
        <strong>Category:</strong> ${categoryLabel}<br/>
        <strong>Name:</strong> ${safeName}<br/>
        <strong>Email:</strong> ${safeEmail}<br/>
        <strong>Subject:</strong> ${safeSubject}
      </p>
      <div style="margin: 16px 0; padding: 12px; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 12px;">
        <div style="font-weight: 600; margin-bottom: 8px;">Message</div>
        <pre style="margin: 0; white-space: pre-wrap; word-break: break-word; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;">${safeMessage}</pre>
      </div>
      <p style="margin: 16px 0 0; color: #6b7280; font-size: 12px;">
        IP: ${safeIp}<br/>
        User-Agent: ${safeUserAgent}<br/>
        Time: ${new Date().toISOString()}
      </p>
    </div>
  `;

  const text = `New contact form message

Category: ${categoryLabel}
Name: ${name || "(not provided)"}
Email: ${email}
Subject: ${subject}

Message:
${message}

IP: ${ip}
User-Agent: ${userAgent}
Time: ${new Date().toISOString()}
`;

  const result = await sendEmail({
    to: toEmail,
    subject: fullSubject,
    html,
    text,
    replyTo: email,
  });

  if (!result.success) {
    return jsonError(500, "Failed to send message. Please try again later.");
  }

  return NextResponse.json({ success: true });
}


