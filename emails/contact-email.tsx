import { COMPANY_NAME } from "@/constants";

export type ContactEmailData = {
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  message: string;
};

export function contactEmailHtml(data: ContactEmailData): string {
  const { firstName, lastName, email, company, message } = data;
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Contact Form Submission</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;border:1px solid #e4e4e7;">

          <!-- Header -->
          <tr>
            <td style="background:#1e1e2e;padding:32px 40px;">
              <p style="margin:0;color:#a1a1aa;font-size:13px;letter-spacing:1px;text-transform:uppercase;">
                ${COMPANY_NAME}
              </p>
              <h1 style="margin:8px 0 0;color:#ffffff;font-size:22px;font-weight:700;">
                New Contact Form Submission
              </h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-bottom:24px;border-bottom:1px solid #f4f4f5;">
                    <p style="margin:0 0 4px;color:#71717a;font-size:12px;text-transform:uppercase;letter-spacing:0.5px;">From</p>
                    <p style="margin:0;color:#18181b;font-size:16px;font-weight:600;">${firstName} ${lastName}</p>
                    ${company ? `<p style="margin:2px 0 0;color:#71717a;font-size:14px;">${company}</p>` : ""}
                    <a href="mailto:${email}" style="color:#7c3aed;font-size:14px;text-decoration:none;">${email}</a>
                  </td>
                </tr>

                <tr>
                  <td style="padding-top:24px;">
                    <p style="margin:0 0 8px;color:#71717a;font-size:12px;text-transform:uppercase;letter-spacing:0.5px;">Message</p>
                    <p style="margin:0;color:#18181b;font-size:15px;line-height:1.7;white-space:pre-wrap;">${message}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Reply CTA -->
          <tr>
            <td style="padding:0 40px 32px;">
              <a href="mailto:${email}?subject=Re: Your enquiry to ${COMPANY_NAME}"
                 style="display:inline-block;background:#7c3aed;color:#ffffff;font-size:14px;font-weight:600;padding:12px 24px;border-radius:6px;text-decoration:none;">
                Reply to ${firstName}
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f9f9fb;padding:20px 40px;border-top:1px solid #e4e4e7;">
              <p style="margin:0;color:#a1a1aa;font-size:12px;">
                This email was sent from the contact form on the ${COMPANY_NAME} website.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
}
