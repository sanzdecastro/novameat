// src/pages/api/send-mail.js
import { sendMail } from "../../lib/send-mail.js";

export async function POST({ request }) {
  try {
    const { mail, subject, message, service, token, name, company } =
      await request.json();

    if (!token) {
      return new Response(
        JSON.stringify({ ok: false, error: "Missing recaptcha token" }),
        { status: 400 }
      );
    }

    // ✅ Verificar reCAPTCHA v3 (server-side)
    const params = new URLSearchParams();
    params.set("secret", import.meta.env.RECAPTCHA_SECRET_KEY);
    params.set("response", token);

    const verifyRes = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });

    const verify = await verifyRes.json();

    // Ajusta el umbral si hace falta (0.3-0.7 típico)
    const ok =
      verify?.success === true &&
      verify?.action === "contact" &&
      typeof verify?.score === "number" &&
      verify.score >= 0.5;

    if (!ok) {
      return new Response(
        JSON.stringify({
          ok: false,
          error: "Recaptcha failed",
          // opcional: quita esto en prod si no quieres exponer detalles
          details: { success: verify?.success, score: verify?.score, action: verify?.action },
        }),
        { status: 403 }
      );
    }

    // ✅ Solo si el captcha pasa, envías el mail
    await sendMail({ mail, subject, message, service, name, company });

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err) {
    console.error("Error enviando email:", err);
    return new Response(
      JSON.stringify({ ok: false, error: err?.message || "Server error" }),
      { status: 500 }
    );
  }
}
