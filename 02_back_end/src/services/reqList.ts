import { Request, RequestHandler, Response } from 'express';
import { IssueBookRequest } from '../models/issueRequest';

export  const reqList: RequestHandler = async (req: Request, res: Response)=> {    

    const requests = await IssueBookRequest.find({});

    const data = await IssueBookRequest.aggregate([
        {
            $lookup: {
               from: "users",
               localField: "user_id",
               foreignField: "_id",
               as: "user"
            }
        },
        {
            $unwind: {
                path:'$user',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $lookup: {
                 from: "books",
                 localField: "book_id",
                 foreignField: "_id",
                 as: "book"
            }
        },
        {
            $unwind: {
                path: '$book', 
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $project: {
                book_name: "$book.title",
                user_name: "$user.name",
                status: 1,
                from_date: 1,
                to_date: 1
            }
        }
    ]);
    console.log(data);
    if(requests)
    {
        return res.send(data);
    }
    else
    return res.status(400).json({err: "No Requests Found"});
}