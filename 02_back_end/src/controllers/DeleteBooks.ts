import { Request, RequestHandler, Response } from 'express';
import deletebooks from '../services/deletebooks';

export  const DeleteBooks: RequestHandler = async (req: Request, res: Response)=> {
    // const firstname = req.body.firstname;
    // const password = req.body.password;
    deletebooks(req, res);
}