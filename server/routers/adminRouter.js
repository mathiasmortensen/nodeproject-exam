import { Router } from 'express';
import { isAdmin } from '../middleware/authMiddleware.js';
import db from '../db/connection.js';

const router = Router();

router.get('/admin/users', isAdmin, async (req, res) => {
  try {
    const result = await db.query(
      `
      SELECT * from users;
      `
    );

    const users = result.rows;

    return res.status(200).send(users);
  } catch (error) {
    return res.status(500).send({ message: 'An error occurred' });
  }
});

router.delete('/admin/users/:id', isAdmin, async (req, res) => {
  const userIdToBeDeleted = req.params.id;
  try {
    const result = await db.query(
      `
      DELETE FROM users WHERE id = $1;
      `[userIdToBeDeleted]
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
