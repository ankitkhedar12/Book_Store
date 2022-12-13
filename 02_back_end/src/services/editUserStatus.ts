import { Request, RequestHandler, Response } from 'express';
import dotenv from 'dotenv';
import { IssueBookRequest } from '../models/issueRequest';
import { User } from '../models/user';


dotenv.config({
    path: '.env'
  });

export default async function editUserStatus(req: Request, res: Response){
    const { status } = req.body;
    const id = req.query.id;
    console.log('Status', status)
    // Update Status
    let request;
    // Save
    try{
        await User.updateOne(
            { _id: id },
            {
              $set: { status: status },
              $currentDate: { lastModified: true }
            }
         )
         request = await User.findOne({_id:id})
         console.log("user: ",request);
        res.json(request);
    }
    catch(err){
        return res.status(400).json({msg: (err)});
    }
    // res.json("Updated");
}