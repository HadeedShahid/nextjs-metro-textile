/**
 * Posts a form to /api/contact and resolves to an error message, or null on
 * success. Shared by the quote and contact forms so both handle a network
 * failure, a non-JSON reply and a server error the same way.
 */
export async function submitForm(body: FormData | Record<string, unknown>, fallbackError: string): Promise<string | null> {
  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      // FormData sets its own multipart boundary, so it gets no Content-Type here.
      ...(body instanceof FormData
        ? { body }
        : { headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }),
    });
    const json: { error?: string } = await res.json().catch(() => ({}));
    return res.ok && !json.error ? null : json.error || fallbackError;
  } catch {
    return fallbackError;
  }
}
