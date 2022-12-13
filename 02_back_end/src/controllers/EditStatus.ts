import { Request, RequestHandler, Response } from 'express';
import editStatus from '../services/editStatus';

export  const EditStatus: RequestHandler = async (req: Request, res: Response)=> {
    // const firstname = req.body.firstname;
    // const password = req.body.password;
    editStatus(req, res);
}