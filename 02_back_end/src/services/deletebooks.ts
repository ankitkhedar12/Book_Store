import { Request, RequestHandler, Response } from 'express';
import dotenv from 'dotenv';
import { BookModel } from '../models/bookModel';


dotenv.config({
    path: '.env'
  });

export default async function deletebooks(req: Request, res: Response){
    const id = req.query.id;
    console.log(req.query);

    // Create New Book
    const book = await BookModel.findOne({ id });
    // Save
    await BookModel.deleteOne({ "_id": id });
//     await book.save((err, book) => {
//       if(err)
//       {
//           return res.status(400).json({msg: (err)});
//       }
//       // user.hashed_password = undefined;
//       // user.salt = undefined;
    //   console.log("Book Created: ", book);
      res.json({book});
//   })
}