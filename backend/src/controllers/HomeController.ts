import { Request, Response } from 'express';
import pool from '../config/db';
import {Home} from '../models/Home';


export class HomeController {
  async getHomes(req: Request, res: Response) {
    const { skip, take } = req.query;

    try {
      const client = await pool.connect();
      const result = await client.query(
        'SELECT * FROM homes ORDER BY id OFFSET $1 LIMIT $2',
        [Number(skip) || 0, Number(take) || 10]
      );
      client.release();

      const homes = result.rows;
      res.json(homes);
    } catch (error) {
      console.error('Error retrieving homes', error);
      res.status(500).send('Server Error');
    }
  }

  async createHome(req: Request, res: Response) {
    const { name, desc, price, post_code }:Home = req.body;
    const postCodeValue = post_code ?? ""; 
    try {
      const client = await pool.connect();
      const result = await client.query(
        'INSERT INTO homes (name, description, price, post_code) VALUES ($1, $2, $3, $4) RETURNING *',
        [name, desc, price, postCodeValue]
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
    const { name, desc, price } = req.body;

    try {
      const client = await pool.connect();
      const result = await client.query(
        'UPDATE homes SET name = $1, description = $2, price = $3 WHERE id = $4 RETURNING *',
        [name, desc, price, id]
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
    // Logic to handle GET request for '/postCode'
    res.send('GET: /postCode');
  }

  async getPostCodeDetail(req: Request, res: Response) {
    const { postCodeValue } = req.params;
    // Logic to handle GET request with path parameter 'postCodeValue'
    res.send(`GET: /postCode/${postCodeValue}`);
  }
}
