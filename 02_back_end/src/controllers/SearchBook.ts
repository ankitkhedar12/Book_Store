import { Request, RequestHandler, Response, NextFunction } from 'express';
import issueBooks from '../services/issueBook';
import { getBooksList } from '../services/getBooksList';
import { searchBook } from '../services/searchBook';

export  const SearchBook: RequestHandler = async (req: Request, res: Response, next: NextFunction)=> {
    // const firstname = req.body.firstname;
    // const password = req.body.password;
    searchBook(req, res, next);
}