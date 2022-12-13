import { Request, RequestHandler, Response, NextFunction } from 'express';
import issueBooks from '../services/issueBook';
import { getBooksList } from '../services/getBooksList';

export  const BooksList: RequestHandler = async (req: Request, res: Response, next: NextFunction)=> {
    // const firstname = req.body.firstname;
    // const password = req.body.password;
    getBooksList(req, res, next);
}