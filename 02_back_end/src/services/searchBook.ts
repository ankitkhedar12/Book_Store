import { Request, RequestHandler, Response } from 'express';
import { BookModel } from '../models/bookModel';

export  const searchBook: RequestHandler = async (req: Request, res: Response)=> {    
    const { searchvalue } = req.body;
    console.log("SearchValue: ", searchvalue);
    // console.log(req.headers.authorization);
    // console.log('user',req.headers.user);
    const books = await BookModel.find({title: {$regex: searchvalue, $options: 'i'}});

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