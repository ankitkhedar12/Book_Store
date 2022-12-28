import { Request, RequestHandler, Response } from 'express';
import dotenv from 'dotenv';
import { IssueBookRequest } from '../models/issueRequest';

dotenv.config({
    path: '.env'
  });

export default async function editStatus(req: Request, res: Response){
    const { status, bookId } = req.body;

    // Update Status
    try{
        await IssueBookRequest.updateOne(
            { _id: bookId },
            {
              $set: { status: status },
              $currentDate: { lastModified: true }
            }
         )
         const request = await IssueBookRequest.findOne({_id: bookId})
         console.log(request);
        res.json(request);
    }
    catch(err){
      consl
        return {msg: (err)};
    }
    // res.json("Updated");
}