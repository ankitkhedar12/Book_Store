import { Request, RequestHandler, Response } from 'express';
import addbooks from '../services/addbooks';

export  const AddBooks: RequestHandler = async (req: Request, res: Response)=> {
    // const firstname = req.body.firstname;
    // const password = req.body.password;
    addbooks(req, res);
}