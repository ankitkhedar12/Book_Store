import { Request, RequestHandler, Response } from 'express';
// import Login from '../services/UserLogin'
import jwt from 'jsonwebtoken';

import { User } from '../models/user';
import bcrypt from 'bcrypt';
import signin from '../services/UserLogin';

export  const Signin: RequestHandler = async (req: Request, res: Response)=> {
    
    signin(req, res);
    // res.end(Login(email, password)) 
}