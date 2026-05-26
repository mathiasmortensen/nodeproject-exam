import 'dotenv/config';
import { Router } from 'express';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import db from '../db/connection.js';
import { sendResetPasswordEmail, sendWelcomeEmail } from '../util/mailer.js';
import { isAuthenticated } from '../middleware/authMiddleware.js';
import { forgotPasswordLimiter } from '../middleware/authMiddleware.js';

const router = Router();
const saltRounds = 10;

async function findUserByIdentifier(identifier) {
  const result = await db.query(
    `
    SELECT id, email, username, password_hash
    FROM users
    WHERE email = $1 OR username = $1
    `,
    [identifier]
  );

  return result.rows[0];
}

router.post('/auth/signup', async (req, res) => {
  const { email, username, password } = req.body;

  if (!email || !username || !password) {
    return res.status(400).send({ message: 'All fields must be filled.' });
  }

  if (username.length < 4) {
    return res.status(400).send({ message: 'Username is too short..' });
  }
  if (password.length < 7) {
    return res.status(400).send({ message: 'Password must be atleast 7 characters..' });
  }

  try {
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const result = await db.query(
      `
      INSERT INTO users (email, username, password_hash)
      VALUES ($1, $2, $3)
      RETURNING id, email, username;
      `,
      [email, username, passwordHash]
    );

    const user = result.rows[0];
    req.session.userId = user.id;

    try {
      await sendWelcomeEmail(user.email, user.username);
    } catch (error) {
      return res.status(500).send({ message: 'An error occurred while trying to send welcome email' });
    }

    return res.status(201).send({
      message: 'User created',
      user
    });
  } catch (error) {
    return res.status(500).send({ message: 'Error occurred while signing up. try again.' });
  }
});

router.post('/auth/login', async (req, res) => {
  const { identifier, password } = req.body;

  if (!identifier || !password) {
    return res.status(400).send({ message: 'Something is empty...' });
  }

  try {
    const user = await findUserByIdentifier(identifier);

    if (!user) {
      return res.status(401).send({ message: 'Email, username or password is wrong..' });
    }

    const validPassword = await bcrypt.compare(password, user.password_hash);

    if (!validPassword) {
      return res.status(401).send({ message: 'Wrong email, username or password..' });
    }

    req.session.userId = user.id;

    return res.status(200).send({ message: 'Login succesful..' });
  } catch (error) {
    return res.status(500).send({ message: 'An error occurred whilst trying to log you in..' });
  }
});

router.post('/auth/logout', isAuthenticated, (req, res) => {
  try {
    req.session.destroy();
    res.clearCookie('connect.sid');
    return res.status(200).send({ message: 'Logout succesful..' });
  } catch (error) {
    return res.status(500).send({ message: 'An error occurred whilst trying to log you out..' });
  }
});

router.get('/auth/me', isAuthenticated, async (req, res) => {
  try {
    const result = await db.query(
      `
      SELECT id, email, username, is_admin
      FROM users
      WHERE id = $1
      `,
      [req.session.userId]
    );

    const user = result.rows[0];

    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    const favResult = await db.query(
      `
      SELECT champion_id FROM favorite_champions WHERE user_id = $1
      `,
      [req.session.userId]
    );

    user.favoriteChampions = favResult.rows.map((row) => row.champion_id);

    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send({ message: 'An error occurred' });
  }
});

router.delete('/auth/me', isAuthenticated, async (req, res) => {
  try {
    const result = await db.query(
      `
      SELECT is_admin FROM users WHERE id = $1
      `,
      [req.session.userId]
    );

    const user = result.rows[0];

    if (!user) {
      return res.status(404).send({ message: 'User not found...' });
    }

    if (user.is_admin === true) {
      return res.status(400).send({ message: 'Admins cannot delete their own accounts..' });
    }

    await db.query(
      `
      DELETE FROM users WHERE id = $1
      `,
      [req.session.userId]
    );

    req.session.destroy((error) => {
      if (error) {
        res.send({ message: 'User has been deleted, but the session could not be destroyed..' });
      }
    });

    res.clearCookie('connect.sid');

    res.status(200).send({ message: `User has been deleted.` });
  } catch (error) {
    res.status(500).send({ message: 'User could not be deleted.' });
  }
});

router.post('/auth/forgot-password', forgotPasswordLimiter, async (req, res) => {
  const { email } = req.body;

  try {
    const result = await db.query(`SELECT id, email FROM users WHERE email = $1`, [email]);

    if (result.rowCount === 0) {
      return res.status(200).send({ message: 'If the email exists, a reset link has been sent.' });
    }

    const token = crypto.randomUUID();
    const expiresAt = new Date(Date.now() + 1000 * 60 * 15);

    await db.query(
      `
      UPDATE users
      SET reset_password_token = $1,
      reset_password_expires_at = $2
      WHERE id = $3
      `,
      [token, expiresAt, result.rows[0].id]
    );

    const resetLink = `${process.env.CLIENT_URL}/reset-password?token=${token}`;
    await sendResetPasswordEmail(email, resetLink);

    return res.status(200).send({ message: 'If the email exists, a reset link has been sent..' });
  } catch (error) {
    return res.status(500).send({ message: 'An error occurred..' });
  }
});

router.post('/auth/reset-password', async (req, res) => {
  const { token, password } = req.body;

  try {
    const result = await db.query(
      `
  SELECT id FROM users WHERE reset_password_token = $1
  AND reset_password_expires_at > NOW();
  `,
      [token]
    );

    if (result.rowCount === 0) {
      return res.status(400).send({ message: 'Invalid or expired..' });
    }

    const passwordHash = await bcrypt.hash(password, saltRounds);

    await db.query(
      `
  UPDATE users
  SET password_hash = $1,
  reset_password_token = NULL,
  reset_password_expires_at = NULL
  WHERE id = $2
  `,
      [passwordHash, result.rows[0].id]
    );

    return res.status(200).send({ message: 'Password has been changed for the user..' });
  } catch (error) {
    return res.status(500).send({ message: 'An error occurred...' });
  }
});

router.patch('/auth/change-password', isAuthenticated, async (req, res) => {
  const { oldPassword, newPassword, newPasswordAgain } = req.body;

  if (!oldPassword || !newPassword || !newPasswordAgain) {
    return res.status(400).send({ message: 'All fields must be filled..' });
  }

  if (newPassword !== newPasswordAgain) {
    return res.status(400).send({ message: 'New password must be the same..' });
  }

  if (oldPassword === newPassword) {
    return res.status(400).send({ message: 'New password cannot be same as old password..' });
  }

  try {
    const result = await db.query(
      `
      SELECT id, password_hash
      FROM users
      WHERE id = $1
      `,
      [req.session.userId]
    );

    const user = result.rows[0];

    if (!user) {
      return res.status(404).send({ message: 'User does not exist...' });
    }

    const oldValidPassword = await bcrypt.compare(oldPassword, user.password_hash);

    if (!oldValidPassword) {
      return res.status(401).send({ message: 'Current password is wrong..' });
    }

    const passwordHash = await bcrypt.hash(newPassword, saltRounds);

    await db.query(
      `
      UPDATE users
      SET password_hash = $1
      WHERE id = $2
      `,
      [passwordHash, req.session.userId]
    );

    return res.status(200).send({ message: 'Password has succesfully been changed!' });
  } catch (error) {
    return res.status(500).send({ message: 'An error occurred during password change..' });
  }
});

export default router;
