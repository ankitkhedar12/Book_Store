import { Request, RequestHandler, Response } from 'express';
import signin from '../services/UserLogin';

export  const Signin: RequestHandler = async (req: Request, res: Response)=> {
    res.send(await signin(req.body));
}