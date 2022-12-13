import { Request, RequestHandler, Response, NextFunction } from 'express';
import issueBooks from '../services/issueBook';
import { userList } from '../services/userList';

export  const UsersList: RequestHandler = async (req: Request, res: Response, next: NextFunction)=> {
    // const firstname = req.body.firstname;
    // const password = req.body.password;
    userList(req, res, next);
}