// src/pages/api/send-mail.js
import { sendMail } from '../../lib/send-mail.js';

export async function POST({ request }) {
  try {
    const { mail, subject, message, service } = await request.json();
    await sendMail({ mail, subject, message, service });
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err) {
    console.error('Error enviando email:', err);
    return new Response(JSON.stringify({ ok: false, error: err.message }), { status: 500 });
  }
}