import { Request, RequestHandler, Response } from 'express';
import issueBooks from '../services/issueBook';

export  const IssueBook: RequestHandler = async (req: Request, res: Response)=> {
    // issueBooks(req, res);
    res.status(200).send(await issueBooks(req.body));
}