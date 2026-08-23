import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import {
  RESEND_API_KEY,
  RESEND_FROM_EMAIL,
  FORM_RECIPIENT_EMAIL,
  MAX_QUOTE_ATTACHMENT_BYTES,
  MAX_QUOTE_ATTACHMENTS,
} from "@/constants";
import { contactEmailHtml, type ContactEmailData } from "@/emails/contact-email";
import { quoteEmailHtml } from "@/emails/quote-email";

let resend: Resend | undefined;

function getResend(): Resend {
  if (!RESEND_API_KEY) {
    throw new Error("Missing RESEND_API_KEY environment variable.");
  }
  if (!resend) {
    resend = new Resend(RESEND_API_KEY);
  }
  return resend;
}

export async function POST(req: NextRequest) {
  // Quote requests arrive as multipart/form-data (they may carry attachments)
  if (req.headers.get("content-type")?.includes("multipart/form-data")) {
    const form = await req.formData();

    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const requirements = String(form.get("requirements") ?? "").trim();

    if (!name || !email || !requirements) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const files = form
      .getAll("files")
      .filter((f): f is File => f instanceof File && f.size > 0);

    if (files.length > MAX_QUOTE_ATTACHMENTS) {
      return NextResponse.json(
        { error: `You can attach up to ${MAX_QUOTE_ATTACHMENTS} files.` },
        { status: 400 },
      );
    }
    const totalBytes = files.reduce((sum, f) => sum + f.size, 0);
    if (totalBytes > MAX_QUOTE_ATTACHMENT_BYTES) {
      return NextResponse.json(
        { error: "Attachments exceed the 4 MB total limit." },
        { status: 400 },
      );
    }

    const attachments = await Promise.all(
      files.map(async (file) => ({
        filename: file.name,
        content: Buffer.from(await file.arrayBuffer()),
        contentType: file.type || undefined,
      })),
    );

    const { data, error } = await getResend().emails.send({
      from: RESEND_FROM_EMAIL,
      to: [FORM_RECIPIENT_EMAIL],
      replyTo: email,
      subject: `Quote Request: ${name}`,
      html: quoteEmailHtml({
        name,
        email,
        requirements,
        attachmentNames: files.map((f) => f.name),
      }),
      attachments: attachments.length > 0 ? attachments : undefined,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, id: data?.id });
  }

  const body = await req.json();
  const { type } = body as { type: "contact" | "quote" };

  if (type === "contact") {
    const payload = body as ContactEmailData & { type: string };
    const { firstName, lastName, email, company, message } = payload;

    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const { data, error } = await getResend().emails.send({
      from: RESEND_FROM_EMAIL,
      to: [FORM_RECIPIENT_EMAIL],
      replyTo: email,
      subject: `Contact Form: ${firstName} ${lastName}`,
      html: contactEmailHtml({ firstName, lastName, email, company, message }),
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, id: data?.id });
  }

  return NextResponse.json({ error: "Invalid request type." }, { status: 400 });
}
