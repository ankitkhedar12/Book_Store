import { Request, RequestHandler, Response } from 'express';
import dotenv from 'dotenv';
import { IssueBookRequest } from '../models/issueRequest';
import { BookModel } from '../models/bookModel';


dotenv.config({
    path: '.env'
  });

export default async function issueBooks(req: Request, res: Response){
    const { user_id, book_id, status, from_date, to_date } = req.body;

    // console.log(from_date, to_date)
    if(from_date === undefined){
      return res.status(200).json({value: 2})
    }
    if(to_date === undefined){
      return res.status(200).json({value: 3})
    }
     const checking = await IssueBookRequest.findOne(
      { user_id: user_id, book_id: book_id },
      )
      console.log("checking", checking);
      if(checking){
        return res.status(200).json({value: 5})
      }

    // Create New Book Issue Request
    const issueRequest = new IssueBookRequest({ user_id, book_id, status, from_date, to_date });
    // Save
    await issueRequest.save(async (err, bookRequest) => {
      if(err)
      {
          return res.status(400).json({msg: (err)});
      }

      const book = await BookModel.findOne({_id: book_id});
      const newBookquantity = book?.quantity;
      if(newBookquantity){
        await BookModel.updateOne(
          { _id: book_id },
          {
            $set: { quantity: newBookquantity-1 },
            $currentDate: { lastModified: true }
          }
       )
       console.log("NewBookQuantity: ",newBookquantity-1)
      }
      else{
        return res.status(200).json({value: 4})
      }
      
      // user.hashed_password = undefined;
      // user.salt = undefined;
      return res.status(200).json({value: 1});
      // console.log("Book Created: ", bookRequest);
      // res.json({bookRequest});
  })
}