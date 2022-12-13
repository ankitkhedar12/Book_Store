import { Request, RequestHandler, Response, NextFunction } from 'express';
import issueBooks from '../services/issueBook';
import { reqList } from '../services/reqList';

export  const ReqList: RequestHandler = async (req: Request, res: Response, next: NextFunction)=> {
    // const firstname = req.body.firstname;
    // const password = req.body.password;
    reqList(req, res, next);
}