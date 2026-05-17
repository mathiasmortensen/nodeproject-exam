import { Router } from 'express';
import { isAuthenticated } from './authRouter.js';
import db from '../db/connection.js';

const router = Router();

router.get('/api/favorites', isAuthenticated, async (req, res) => {
  try {
    const result = await db.query(
      `
      SELECT champion_key, championer_name
      FROM favorite_champion
      WHERE user_id = $1;`,
      [req.session.userId]
    );
    res.send({ favorites: result.rows });
  } catch (error) {
    res
      .status(500)
      .send({ message: 'An error occured whilst trying to get favorites..' });
  }
});

router.post('/api/favorites', isAuthenticated, async (req, res) => {
  const { champion_key, champion_name } = req.body;


  try{
    await db.query(`
      INSERT INTO favorite_champions (user_id, champion_key, champion_name)
      VALUES ($1, $2, $3)
      ON CONFLICT (user_id, champion_key) DO NOTHING
      `, [req.session.userId, champion_key, champion_name]);
      res.status(201).send({ messsage: `${champion_name} has been added to your favorites!`});
  }catch(error){
    res.status(500).send({ message: `${champion_name} Could not be added at the moment...`});
  }
});

router.delete('/api/favorites/:champion_key', isAuthenticated, async (req, res) => {
  try {
    await db.query(
      `
      DELETE FROM favorite_champions WHERE user_id = $1 and champion_key = $2`, [req.session.userId, champion_key]
    );
    res.status(200).send({ message: 'favorite removed..'});
  }catch(error){
    res.status(500).send({ messsage: 'An error occured whilst trying to remove favorite...'});
  }
});


export default router;
