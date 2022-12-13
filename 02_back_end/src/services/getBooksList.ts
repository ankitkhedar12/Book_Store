import { Request, RequestHandler, Response } from 'express';
import { BookModel } from '../models/bookModel';

export  const getBooksList: RequestHandler = async (req: Request, res: Response)=> {    

    // console.log(req.headers.authorization);
    // console.log('user',req.headers.user);
    const books = await BookModel.find({});

    // If users are found
    if(books)
    {
        // return response with user and send to client
        // const { name, email, password, role } = user;
        return res.send(books);
    }
    else
    return res.status(400).json({err: "No Books Found"});
}