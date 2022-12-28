import { Request, RequestHandler, Response, NextFunction } from 'express';
import { userReqList } from '../services/userReqList';

export  const UserReqList: RequestHandler = async (req: Request, res: Response)=> {
    const response = await userReqList(req.body)
    console.log("1111111111: ", req.body);
    res.send(response);
}