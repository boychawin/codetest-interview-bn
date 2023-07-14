import express, { Request, Response } from 'express';
import pool from '../config/db';

const router = express.Router();

router.get('/example', async (req: Request, res: Response) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM examples');
    client.release();

    res.json(result.rows);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).send('Server Error');
  }
});

export default router;
