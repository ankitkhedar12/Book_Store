import { Request, RequestHandler, Response } from 'express';
import dotenv from 'dotenv';
import { IssueBookRequest } from '../../models/issueRequest';
import { User } from '../../models/user';
import { IEditUserStatus } from '../../interfaces/interfaces';


dotenv.config({
    path: '.env'
  });

export default async function editUserStatus(data: IEditUserStatus){
    const { status, id } = data;
    try{
        await User.updateOne(
            { _id: id },
            {
              $set: { status: status },
              $currentDate: { lastModified: true }
            }
         )
        return { msg: "Status Changed"};
    }
    catch(err){
        return {msg: (err)};
    }
}