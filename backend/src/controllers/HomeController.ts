import { Request, Response } from 'express';
import pool from '../config/db';
import { Home } from '../models/Home';


export class HomeController {
  async getHomes(req: Request, res: Response) {
    const { skip, take } = req.query;

    try {
      const client = await pool.connect();
      const result = await client.query(
        'SELECT * FROM homes ORDER BY id OFFSET $1 LIMIT $2',
        [Number(skip) || 0, Number(take) || 10]
      );

      // Retrieve the count of all homes
      // const countResult = await client.query('SELECT COUNT(*) FROM homes');
      client.release();
      const homes = result.rows;
      // const count = parseInt(countResult.rows[0].count); // Total count of all homes
      const count = homes.length; // Calculate the count based on the homes array

      res.json({ payload: homes, count });
    } catch (error) {
      console.error('Error retrieving homes', error);
      res.status(500).send('Server Error');
    }
  }

  async createHome(req: Request, res: Response) {
    const { name, desc, price, post_code }: Home = req.body;
    if (name == null) {
      return res.status(400).send('Name is required');
    }
    if (post_code == null) {
      return res.status(400).send('Post code is required');
    }

    try {
      const client = await pool.connect();
      const result = await client.query(
        'INSERT INTO homes (name, description, price, post_code) VALUES ($1, $2, $3, $4) RETURNING *',
        [name, desc, price, post_code]
      );
      client.release();

      const home = result.rows[0];
      res.status(201).json(home);
    } catch (error) {
      console.error('Error creating home', error);
      res.status(500).send('Server Error');
    }
  }

  async updateHome(req: Request, res: Response) {
    const { id } = req.params;
    const { name, desc, price, post_code } = req.body;

    try {
      const client = await pool.connect();
      const result = await client.query(
        'UPDATE homes SET name = $1, description = $2, price = $3, post_code = $4 WHERE id = $5 RETURNING *',
        [name, desc, price, post_code, id]
      );
      client.release();

      const home = result.rows[0];
      if (!home) {
        return res.status(404).send('Home not found');
      }

      res.json(home);
    } catch (error) {
      console.error('Error updating home', error);
      res.status(500).send('Server Error');
    }
  }

  async deleteHome(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const client = await pool.connect();
      const result = await client.query('DELETE FROM homes WHERE id = $1', [id]);
      client.release();

      if (result.rowCount === 0) {
        return res.status(404).send('Home not found');
      }

      res.sendStatus(204);
    } catch (error) {
      console.error('Error deleting home', error);
      res.status(500).send('Server Error');
    }
  }

  async getPostCode(req: Request, res: Response) {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT DISTINCT post_code FROM homes');
      client.release();

      const postCodes = result.rows.map((row: any) => row.post_code);
      const payload = postCodes.map((post_code: string) => ({ post_code }));
      const count = postCodes.length;

      res.json({ payload, count });
    } catch (error) {
      console.error('Error retrieving post codes', error);
      res.status(500).send('Server Error');
    }
  }


  async getPostCodeDetail(req: Request, res: Response) {
    const { postCodeValue } = req.params;

    try {
      const client = await pool.connect();
      const result = await client.query(
        'SELECT AVG(price) AS average, PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY price) AS median FROM homes WHERE post_code = $1',
        [postCodeValue]
      );
      client.release();

      const { average, median } = result.rows[0];

      res.json({ payload: { average, median } });
    } catch (error) {
      console.error('Error retrieving post code detail', error);
      res.status(500).send('Server Error');
    }
  }

}
