import { Request, RequestHandler, Response } from 'express';
import deletebooks from '../services/deletebooks';

export  const DeleteBooks: RequestHandler = async (req: Request, res: Response)=> {
    res.send(await deletebooks(req.body))
}