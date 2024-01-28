import { Request, Response } from "express";
import { OkPacket} from 'mysql';
import pool from '../database';
import { RowDataPacket } from "mysql2/typings/mysql/lib/protocol/packets/RowDataPacket";

class GamesController {

    public async  list(req: Request, res: Response) : Promise<Response<any>> {       
       try {
           const result = await pool.query('SELECT * FROM games') as any;
           const games = result;
           if (games.length > 0) {
               return res.json(games[0]);
           } else {
               return res.status(404).json({ message: "Games doesn't exists" });
           }
       } catch (error) {
           return res.status(500).json({ message: "An error occurred" });
       }
    }
    
    public async create(req: Request, res: Response) {
        try {
            const result = await pool.query('INSERT INTO games set ?', [req.body]);
            res.json({ message: 'Game saved' });                     
        } catch (error) {
            res.json({ message: 'An error occurs saving Game--> ' + error });
        }
    }
    
    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const [result] = await pool.query('DELETE FROM games WHERE id = ?', [id]) as unknown as [OkPacket];
        console.log(result); // Log the result to see its structure
        // Check if any rows were affected
        if (result.affectedRows > 0) {
            res.json({ message: "The game was deleted" });
        } else {
            res.json({ message: "No game found with the provided ID" });
        }
    }

    public async update(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const oldGame = req.body;

        if (!oldGame.title || !oldGame.description) {
            res.status(400).json({ message: "Missing required fields: title and description" });
        }

        const [games] = await pool.query('SELECT * FROM games WHERE id = ?', [id]) as unknown as [RowDataPacket[]];

        if (games.length === 0) {
            return res.status(404).json({ message: "Game not found" });
        }

        const [result] = await pool.query('UPDATE games set ? WHERE id = ?', [req.body, id]) as unknown as [OkPacket];   

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "No game updated" });
        }

        return res.json({ message: "The game was updated" });
    }
    
    public async getOne(req: Request, res: Response): Promise<Response<any>> {
        const { id } = req.params;
        try {
            const result = await pool.query('SELECT * FROM games WHERE id = ?', [id]) as any;
            const games = result[0];
            if (games.length > 0) {
                return res.json(games[0]);
            } else {
                return res.status(404).json({ message: "The game doesn't exist" });
            }
        } catch (error) {
            return res.status(500).json({ message: "An error occurred" });
        }
    }   
}

const gamesController = new GamesController;

export default gamesController;