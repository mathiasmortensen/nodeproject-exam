import db from '../db/connection.js';

export function isAuthenticated(req, res, next) {
  if (!req.session?.userId) {
    return res.status(401).send({ message: 'No access' });
  }
  next();
}

export async function isAdmin(req, res, next) {
  if (!req.session.userId) {
    return res.status(401).send({ message: 'No access' });
  }

  try {
    const result = await db.query(
      `
    SELECT is_admin FROM users WHERE id = $1
    ;`,
      [req.session.userId]
    );

    if (result.rows[0] && result.rows[0].is_admin === true) {
      next();
    } else {
      return res.status(403).send({ message: 'Forbidden, only admins may do  this..' });
    }
  } catch (error) {
    return res.status(500).send({ message: 'An error occurred..' });
  }
}
