import { Request, RequestHandler, Response } from 'express';
import dotenv from 'dotenv';
import { BookModel } from '../models/bookModel';


dotenv.config({
    path: '.env'
  });

export default async function addbooks(req: Request, res: Response){
    const { title, author, price, quantity } = req.body;

    // Create New Book
    const book = new BookModel({ title, author, price, quantity });
    
    // check if user already exist
    // Validate if user exist in our database
    const oldBook = await BookModel.findOne({ title });
    if (oldBook) {
      await BookModel.updateOne(
        { title: title },
        {
          $set: { quantity: quantity },
          $currentDate: { lastModified: true }
        }
     )
      return res.status(200).json({msg: "Book Already Exist. or Updated quantity", value: 1})
    }
    
    // Save
    await book.save((err, book) => {
      if(err)
      {
          return res.status(400).json({msg: (err)});
      }
      // user.hashed_password = undefined;
      // user.salt = undefined;
      console.log("Book Created: ", book);
      res.json({book});
  })
}