import { Request, Response } from "express";

class IndexController {
    public index (req: Request, res: Response) {
        res.json({text: 'Default API is in /api/index'});
    }
}
export const indexController = new IndexController;