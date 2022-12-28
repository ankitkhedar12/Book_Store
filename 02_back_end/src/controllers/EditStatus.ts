import { Request, RequestHandler, Response } from 'express';
import editStatus from '../services/editStatus';

export  const EditStatus: RequestHandler = async (req: Request, res: Response)=> {
    res.status(200).send(await editStatus(req.body));
}