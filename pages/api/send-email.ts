import type { NextApiRequest, NextApiResponse } from 'next';
import * as brevo from '@getbrevo/brevo';

const apiInstance = new brevo.TransactionalEmailsApi();

apiInstance.setApiKey(
  brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY as string
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { name, email, message } = req.body;

  if (!name || name.length <= 8) {
    return res.status(400).json({ error: 'El nombre debe tener más de 8 caracteres' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ error: 'El correo electrónico no es válido' });
  }

  if (!message || message.length < 20) {
    return res.status(400).json({ error: 'El mensaje debe tener al menos 20 caracteres' });
  }

  const sendSmtpEmail = new brevo.SendSmtpEmail();
  sendSmtpEmail.sender = { name: 'Mi Página Web', email: process.env.INIT_EMAIL_ADDRESS }; // Usa un correo verificado en Brevo
  sendSmtpEmail.to = [{ email: process.env.DESTINATION_EMAIL_ADDRESS || '', name: 'Destinatario' }];
  sendSmtpEmail.subject = `Nuevo mensaje de ${name}`;
  sendSmtpEmail.htmlContent = `
    <html>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; background-color: #f4f4f4; padding: 20px;">
        <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
          <h1 style="color: #333; text-align: center;">Nuevo mensaje de ${name}</h1>
          <p style="text-align: center;">
            <img src="https://jesusserver.duckdns.org/apps/files_sharing/publicpreview/4LFf3gNsrB5tbpd?file=/&fileId=1003&x=1920&y=1080&a=true&etag=053a358e109901214c95b4e7bf69de43" alt="Chef Image" style="border-radius: 50%; width: 150px; height: 150px;">
          </p>
          <br>
          <p>Estimado Chef,</p>
          <p>Hemos recibido una solicitud de cotización para sus servicios. A continuación, encontrará los detalles del mensaje:</p>
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Mensaje:</strong> ${message}</p>
          <br>
          <p>Por favor, póngase en contacto con el cliente a la mayor brevedad posible para discutir los detalles de la cotización.</p>
          <br>
          <p>Atentamente,</p>
          <p>El equipo de Mi Página Web</p>
        </div>
      </body>
    </html>
  `;

  try {
    await apiInstance.sendTransacEmail(sendSmtpEmail);
    res.status(200).json({ message: 'Correo enviado con éxito' });
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    res.status(500).json({ error: 'Error al enviar el correo' });
  }
}