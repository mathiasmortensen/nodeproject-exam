import { Router } from 'express';
import { isAdmin } from '../middleware/authMiddleware.js';
import db from '../db/connection.js';

const router = Router();

router.get('/admin/users', isAdmin, async (req, res) => {
  try {
    const result = await db.query(
      `
      SELECT id, email, username, riot_region, riot_id, is_admin from users;
      `
    );

    const users = result.rows;

    return res.status(200).send(users);
  } catch (error) {
    return res.status(500).send({ message: 'An error occurred' });
  }
});

router.delete('/admin/users/:id', isAdmin, async (req, res) => {
  const userIdToBeDeleted = Number(req.params.id);

  if (userIdToBeDeleted === req.session.userId) {
    return res.status(400).send({ message: 'You cannot delete an admin user.' });
  }
  try {
    const result = await db.query(
      `
      DELETE FROM users WHERE id = $1 RETURNING id;
      `,
      [userIdToBeDeleted]
    );

    if (result.rowCount === 0) {
      return res.status(404).send({ message: 'User could not be found..' });
    }

    return res.status(200).send({ message: 'User has been succesfully deleted..' });
  } catch (error) {
    return res.status(500).send({ message: 'An error has occurred' });
  }
});

export default router;
