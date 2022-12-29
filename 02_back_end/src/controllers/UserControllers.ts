import { Request, RequestHandler, Response, NextFunction } from 'express';
import issueBooks from '../services/userServices/issueBook';
import { searchBook } from '../services/userServices/searchBook';
import { myRequests } from '../services/userServices/myRequests';

export  const IssueBook: RequestHandler = async (req: Request, res: Response)=> {
    const response = await issueBooks(req.body, req.query);
    res.status(200).send(response);
}

export  const SearchBook: RequestHandler = async (req: Request, res: Response, next: NextFunction)=> {
    const response = await searchBook(req.body);
    res.status(200).send(response);
}

export  const MyRequests: RequestHandler = async (req: Request, res: Response)=> {
    const response = await myRequests(req.body)
    res.send(response);
}