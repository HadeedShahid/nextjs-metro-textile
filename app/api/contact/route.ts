import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { MAX_QUOTE_ATTACHMENT_BYTES, MAX_QUOTE_ATTACHMENTS } from "@/constants";
import { RESEND_API_KEY, RESEND_FROM_EMAIL, FORM_RECIPIENT_EMAIL } from "@/lib/mail";
import { contactEmailHtml } from "@/emails/contact-email";
import { quoteEmailHtml } from "@/emails/quote-email";

let resend: Resend | undefined;

function getResend(): Resend {
  if (!RESEND_API_KEY) {
    throw new Error("Missing RESEND_API_KEY environment variable.");
  }
  resend ??= new Resend(RESEND_API_KEY);
  return resend;
}

const fail = (error: string, status = 400) => NextResponse.json({ error }, { status });

// Deliberately loose: the browser's type="email" check runs first; this only
// stops obvious junk reaching the reply-to header.
const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const str = (value: unknown) => (typeof value === "string" ? value.trim() : "");

type Attachment = { filename: string; content: Buffer; contentType?: string };

/** Sends one form submission to the team inbox, replying to the visitor. */
async function send(message: { replyTo: string; subject: string; html: string; attachments?: Attachment[] }) {
  try {
    const { data, error } = await getResend().emails.send({
      from: RESEND_FROM_EMAIL,
      to: [FORM_RECIPIENT_EMAIL],
      ...message,
    });
    if (error) {
      console.error("[contact] send failed", error);
      return fail("We couldn't send your message. Please try again or email us directly.", 500);
    }
    return NextResponse.json({ ok: true, id: data?.id });
  } catch (err) {
    console.error("[contact] send failed", err);
    return fail("We couldn't send your message. Please try again or email us directly.", 500);
  }
}

/** Quote requests arrive as multipart/form-data, since they may carry attachments. */
async function handleQuote(req: NextRequest) {
  const form = await req.formData();
  const name = str(form.get("name"));
  const email = str(form.get("email"));
  const requirements = str(form.get("requirements"));
  const product = str(form.get("product")) || undefined;

  if (!name || !email || !requirements) return fail("Missing required fields.");
  if (!isEmail(email)) return fail("Please enter a valid email address.");

  const files = form.getAll("files").filter((f): f is File => f instanceof File && f.size > 0);
  if (files.length > MAX_QUOTE_ATTACHMENTS) {
    return fail(`You can attach up to ${MAX_QUOTE_ATTACHMENTS} files.`);
  }
  if (files.reduce((sum, f) => sum + f.size, 0) > MAX_QUOTE_ATTACHMENT_BYTES) {
    return fail(`Attachments exceed the ${MAX_QUOTE_ATTACHMENT_BYTES / (1024 * 1024)} MB total limit.`);
  }

  const attachments = await Promise.all(
    files.map(async (file) => ({
      filename: file.name,
      content: Buffer.from(await file.arrayBuffer()),
      contentType: file.type || undefined,
    })),
  );

  return send({
    replyTo: email,
    subject: product ? `Quote Request: ${product} (${name})` : `Quote Request: ${name}`,
    html: quoteEmailHtml({ name, email, requirements, product, attachmentNames: files.map((f) => f.name) }),
    attachments: attachments.length > 0 ? attachments : undefined,
  });
}

/** The contact form posts JSON. */
async function handleContact(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return fail("Invalid request body.");
  }
  if (body?.type !== "contact") return fail("Invalid request type.");

  const firstName = str(body.firstName);
  const lastName = str(body.lastName);
  const email = str(body.email);
  const company = str(body.company) || undefined;
  const message = str(body.message);

  if (!firstName || !lastName || !email || !message) return fail("Missing required fields.");
  if (!isEmail(email)) return fail("Please enter a valid email address.");

  return send({
    replyTo: email,
    subject: `Contact Form: ${firstName} ${lastName}`,
    html: contactEmailHtml({ firstName, lastName, email, company, message }),
  });
}

export async function POST(req: NextRequest) {
  return req.headers.get("content-type")?.includes("multipart/form-data")
    ? handleQuote(req)
    : handleContact(req);
}
