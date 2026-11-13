// src/lib/send-mail.js
import { Resend } from 'resend';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export async function sendMail({ mail, subject, message, service }) {
  // Monta tú el HTML con el campo service
  const html = `
    <h2>Nuevo mensaje desde el formulario web</h2>
    <p><strong>Servicio seleccionado:</strong> ${service}</p>
    <p><strong>Mensaje:</strong></p>
    <p>${message}</p>
    <p><strong>Mail:</strong></p>
    <p>${mail}</p>
  `;

  // Resend no lanza: devuelve { data, error }. Sin esta comprobación un fallo
  // de envío llegaba al usuario como "¡Correo enviado!".
  const { data, error } = await resend.emails.send({
    from: 'Formulario web <no-reply@novameat.com>',
    to: 'contact@novameat.com',
    replyTo: mail,
    subject,
    html,
  });

  if (error) {
    throw new Error(`Resend: ${error.message || error.name || 'send failed'}`);
  }

  return data;
}