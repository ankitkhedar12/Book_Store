import { Request, RequestHandler, Response } from 'express';
import signup from '../services/UserSignup'

export  const Signup: RequestHandler = async (req: Request, res: Response)=> {
    // const firstname = req.body.firstname;
    // const password = req.body.password;
    signup(req, res);
}