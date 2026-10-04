/**
 * Sends a booking request.
 *
 * TODO: wire this to a real endpoint (Next.js route handler + Resend,
 * Formspree, etc.). Until then it only simulates a network round-trip,
 * so nothing actually reaches the studio.
 */
export async function submitContactRequest(data: FormData): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 1200));
  if (process.env.NODE_ENV !== "production") {
    console.info("[contact] request (not sent — no backend configured)", Object.fromEntries(data));
  }
}
