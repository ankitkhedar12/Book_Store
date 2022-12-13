import { Request, RequestHandler, Response } from 'express';
import editStatus from '../services/editStatus';
import editUserStatus from '../services/editUserStatus';

export  const EditUserStatus: RequestHandler = async (req: Request, res: Response)=> {
    // const firstname = req.body.firstname;
    // const password = req.body.password;
    editUserStatus(req, res);
}