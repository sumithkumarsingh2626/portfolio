import { profile } from '@/data/profile';

type ContactPayload = {
  name: string;
  email: string;
  message: string;
};

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function isReasonableEmail(value: string) {
  const v = value.trim();
  if (v.length > 254) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function json(status: number, body: unknown) {
  return Response.json(body, { status });
}

export async function POST(req: Request) {
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return json(400, { ok: false, error: 'Invalid JSON body.' });
  }

  const { name, email, message } = (payload ?? {}) as Partial<ContactPayload>;

  if (!isNonEmptyString(name)) return json(400, { ok: false, error: 'Name is required.' });
  if (!isNonEmptyString(email) || !isReasonableEmail(email))
    return json(400, { ok: false, error: 'Valid email is required.' });
  if (!isNonEmptyString(message)) return json(400, { ok: false, error: 'Message is required.' });
  if (message.length > 5000) return json(400, { ok: false, error: 'Message is too long.' });

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return json(500, {
      ok: false,
      error: 'Contact form is not configured (missing RESEND_API_KEY).',
    });
  }

  const to = process.env.CONTACT_TO_EMAIL || profile.email;
  const from = process.env.RESEND_FROM || `Portfolio Contact <onboarding@resend.dev>`;

  const subject = `New message from ${name}`;
  const text = `Name: ${name}\nEmail: ${email}\n\n${message}\n`;
  const html = `<div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial;">
<p><strong>Name:</strong> ${escapeHtml(name)}</p>
<p><strong>Email:</strong> ${escapeHtml(email)}</p>
<hr />
<pre style="white-space: pre-wrap; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, monospace;">${escapeHtml(message)}</pre>
</div>`;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to,
      subject,
      text,
      html,
      reply_to: email,
    }),
  });

  if (!res.ok) {
    let details: unknown = undefined;
    try {
      details = await res.json();
    } catch {
      details = await res.text().catch(() => undefined);
    }
    return json(502, { ok: false, error: 'Email provider rejected the request.', details });
  }

  return json(200, { ok: true });
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

