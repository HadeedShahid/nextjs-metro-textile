import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { RESEND_API_KEY, RESEND_FROM_EMAIL, FORM_RECIPIENT_EMAIL } from "@/constants";
import { contactEmailHtml, type ContactEmailData } from "@/emails/contact-email";
import { quoteEmailHtml, type QuoteEmailData } from "@/emails/quote-email";

const resend = new Resend(RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { type } = body as { type: "contact" | "quote" };

  if (type === "contact") {
    const payload = body as ContactEmailData & { type: string };
    const { firstName, lastName, email, company, message } = payload;

    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
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

  if (type === "quote") {
    const payload = body as QuoteEmailData & { type: string };
    const { firstName, lastName, email, company, requirements } = payload;

    if (!firstName || !lastName || !email || !requirements) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: RESEND_FROM_EMAIL,
      to: [FORM_RECIPIENT_EMAIL],
      replyTo: email,
      subject: `Quote Request: ${firstName} ${lastName}${company ? ` — ${company}` : ""}`,
      html: quoteEmailHtml({ firstName, lastName, email, company, requirements }),
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, id: data?.id });
  }

  return NextResponse.json({ error: "Invalid request type." }, { status: 400 });
}
