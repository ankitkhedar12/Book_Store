import { Request, RequestHandler, Response, NextFunction } from 'express';
import signup from '../services/commonServices/UserSignup'
import signin from '../services/commonServices/UserLogin';
import { getBooksList } from '../services/commonServices/getBooksList';

export  const Signup: RequestHandler = async (req: Request, res: Response)=> {
    res.send(await signup(req.body));
}

export  const Signin: RequestHandler = async (req: Request, res: Response)=> {
    res.send(await signin(req.body));
}

export  const BooksList: RequestHandler = async (req: Request, res: Response, next: NextFunction)=> {
    const response = await getBooksList();
    res.status(200).send(response);
}