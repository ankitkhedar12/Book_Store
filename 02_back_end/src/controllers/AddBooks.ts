import { Request, RequestHandler, Response } from 'express';
import addbooks from '../services/addbooks';

export  const AddBooks: RequestHandler = async (req: Request, res: Response)=> {
    res.send(await addbooks(req.body));
}