import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWelcomeEmail(to, username) {
  const { error } = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL,
    to: to,
    subject: `Welcome ${username}`,
    html: '<strong> Enjoy your stay ;)</strong>'
  });

  if (error) {
    throw new Error(error.message);
  }
}

export async function sendResetPasswordEmail(to, resetLink) {
  const { error } = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL,
    to: to,
    subject: 'Reset your password..',
    html: `<a href="${resetLink}">Reset Password Link</a>
    <p>This token resets in 15 minutes..</p>`
  });

  if (error) {
    throw new Error(error.message);
  }
}
