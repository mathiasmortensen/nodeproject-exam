import { Router } from 'express';
import bcrypt from 'bcryptjs';
import db from '../db/connection.js';
import { sendWelcomeEmail } from '../util/mailer.js';

const router = Router();
const saltRounds = 10;

export function isAuthenticated(req, res, next) {
  if (!req.session?.userId) {
    return res.status(401).send({ message: 'no access' });
  }
  next();
}

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
      console.log(error);
    }

    return res.status(201).send({
      message: 'User created',
      user
    });
  } catch (error) {
    return res
      .status(500)
      .send({ message: 'Error occured while signing up. try again.' });
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
      return res
        .status(401)
        .send({ message: 'Email, username or password is wrong..' });
    }

    const validPassword = await bcrypt.compare(password, user.password_hash);

    if (!validPassword) {
      return res
        .status(401)
        .send({ message: 'Wrong email, username or password..' });
    }

    req.session.userId = user.id;

    return res.status(200).send({ message: 'Login succesful..' });
  } catch (error) {
    return res
      .status(500)
      .send({ message: 'An error occured whilst trying to log you in..' });
  }
  return res
    .status(500)
    .send({ message: 'An error occured whilst trying to log you in..' });
});

router.post('/auth/logout', isAuthenticated, (req, res) => {
  try {
    req.session.destroy();
    res.clearCookie('connect.sid');
  } catch (error) {
    return res
      .status(500)
      .send({ message: 'An error occured whilst trying to log you out..' });
  }

  return res.status(200).send({ messsage: 'Logout succesful..' });
});

router.get('/auth/me', isAuthenticated, async (req, res) => {
  try {
    const result = await db.query(
      `
      SELECT id, email, username, riot_id, riot_region
      FROM users
      WHERE id = $1
      `,
      [req.session.userId]
    );

    const user = result.rows[0];

    if (!user) {
      req.session.destroy();

      return res.status(404).send({ messsage: 'User not found' });
    }

    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send({ message: 'An error occured' });
  }
  return res.status(500).send({ message: 'An error occured' });
});

export default router;
