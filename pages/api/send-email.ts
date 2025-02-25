// filepath: /d:/programacion 5.0/portafolio-jorge-martinez/pages/api/send-email.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    console.log(`llave: ${process.env.RESEND_API_KEY}`);
    const { name, email, message } = req.body;

    try {
      await resend.emails.send({
        from: 'Mi pagina web <onboarding@resend.dev>', // Reemplaza con tu correo
        to: process.env.DESTINATION_EMAIL_ADDRESS || '', // Reemplaza con tu correo
        subject: `Nuevo mensaje de ${name}`,
        text: message,
      });
      console.log(`llave: ${process.env.RESEND_API_KEY}`);
      res.status(200).json({ message: 'Correo enviado con éxito' });
    } catch (error) {
        console.log(`llave: ${process.env.RESEND_API_KEY}`);
      res.status(500).json({ error: 'Error al enviar el correo' });
    }
  } else {
    console.log(`llave: ${process.env.RESEND_API_KEY}`);
    res.status(405).json({ error: 'Método no permitido' });
  }
}