import { Request, RequestHandler, Response } from 'express';
import { BookModel } from '../../models/bookModel';

export  const getBooksList = async ()=> {    
    try {
        const books = await BookModel.find({});

        // If books data is availabe in database
        if(books)
        {
            // return response with user and send to client
            return books;
        }
        else
        return {err: "No Books Found", status: 400};
    } catch (error) {
        console.log("Error in getBooksList: " + error);

    }
}