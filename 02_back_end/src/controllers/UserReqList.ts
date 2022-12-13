import { Request, RequestHandler, Response, NextFunction } from 'express';
import { userReqList } from '../services/userReqList';

export  const UserReqList: RequestHandler = async (req: Request, res: Response, next: NextFunction)=> {
    // const firstname = req.body.firstname;
    // const password = req.body.password;
    userReqList(req, res, next);
}