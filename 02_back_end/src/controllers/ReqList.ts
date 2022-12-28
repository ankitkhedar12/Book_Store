import { Request, RequestHandler, Response, NextFunction } from 'express';
import issueBooks from '../services/issueBook';
import { reqList } from '../services/reqList';

export  const ReqList: RequestHandler = async (req: Request, res: Response, next: NextFunction)=> {
    const response = await reqList(req,res, next);
    res.send(response);
}