// src/lib/send-mail.js
import { Resend } from 'resend';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export async function sendMail({ mail, subject, message, service }) {
  // Monta tú el HTML con el campo service
  const html = `
    <h2>Nuevo mensaje desde el formulario</h2>
    <p><strong>Servicio seleccionado:</strong> ${service}</p>
    <p><strong>Mensaje:</strong></p>
    <p>${message}</p>
    <p><strong>Mail:</strong></p>
    <p>${mail}</p>
  `;

  return await resend.emails.send({
    from: 'MiFormulario <no-reply@novameat.com>',
    to: 'contact@novameat.com',
    mail,
    subject,
    html,
  });
}