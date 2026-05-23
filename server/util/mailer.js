import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWelcomeEmail(to, username) {
  const { data, error } = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL,
    to: to,
    subject: `Welcome ${username}`,
    html: '<strong> Enjoy your stay ;)</strong>'
  });

  if (error) {
    return console.log(error.message);
  }
}
