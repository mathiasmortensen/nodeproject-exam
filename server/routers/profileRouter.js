import { Router } from 'express';
import db from '../db/connection.js';
import { isAuthenticated } from './authRouter.js';

const router = Router();

router.patch('/profile/riot', isAuthenticated, async (req, res) => {
  const { riotId, region } = req.body;

  if (!riotId || !region) {
    return res.status(400).send({ message: 'Riot ID and region are required..' });
  }

  if (!riotId.includes('#')) {
    return res.status(400).send({ message: `Riot ID's always use hashtags` });
  }

  try {
    const result = await db.query(
      `
      UPDATE users
      SET riot_id = $1,
        riot_region = $2
      WHERE id = $3
      RETURNING id, email, username, riot_id, riot_region;
      `,
      [riotId, region, req.session.userId]
    );

    return res.status(200).send(result.rows[0]);
  } catch (error) {
    return res.status(500).send({ message: 'An error occured whilst trying to save riotid and region' });
  }
});

export default router;
