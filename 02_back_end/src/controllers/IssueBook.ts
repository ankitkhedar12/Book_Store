import { Request, RequestHandler, Response } from 'express';
import issueBooks from '../services/issueBook';

export  const IssueBook: RequestHandler = async (req: Request, res: Response)=> {
    // const firstname = req.body.firstname;
    // const password = req.body.password;
    issueBooks(req, res);
}