import { Request, RequestHandler, Response } from 'express';
import signup from '../services/UserSignup'

export  const Signup: RequestHandler = async (req: Request, res: Response)=> {
    res.send(await signup(req.body));
}