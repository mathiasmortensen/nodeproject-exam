import { Router } from 'express';
import { isAuthenticated } from '../middleware/authMiddleware.js';
import db from '../db/connection.js';

const router = Router();

router.post('/api/favorites', isAuthenticated, async (req, res) => {
  const { championId } = req.body;

  try {
    await db.query(
      `
      INSERT INTO favorite_champions (user_id, champion_id)
      VALUES ($1, $2)
      ON CONFLICT (user_id, champion_id) DO NOTHING
      `,
      [req.session.userId, championId]
    );
    res.status(201).send({ message: `${championId} has been added to your favorites!` });
  } catch (error) {
    res.status(500).send({ message: `${championId} Could not be added at the moment...` });
  }
});

router.delete('/api/favorites/:championId', isAuthenticated, async (req, res) => {
  const { championId } = req.params;
  try {
    await db.query(
      `
      DELETE FROM favorite_champions WHERE user_id = $1 AND champion_id = $2`,
      [req.session.userId, championId]
    );
    res.status(200).send({ message: `${championId} has been removed from your favorites!` });
  } catch (error) {
    res.status(500).send({ message: 'An error occurred whilst trying to remove favorite...' });
  }
});

export default router;
