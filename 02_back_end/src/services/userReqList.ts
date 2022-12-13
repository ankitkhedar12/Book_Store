import { Request, RequestHandler, Response } from 'express';
import { IssueBookRequest } from '../models/issueRequest';
import { User } from '../models/user';
import { BookModel } from '../models/bookModel';

export const userReqList: RequestHandler = async (req: Request, res: Response)=> {    

    const id = req.headers.id;
    console.log("id----", id)
    const user = await User.findOne({ _id: id });

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
    if(id){
        let userReq = []
        for(let i of data){
            if(i.user_name === user?.name){
                // console.log("name:",user?.name);
                // console.log("i.user_name:",user?.name);
                userReq.push(i);
            }
        }
        return res.send(userReq);
    }
    return res.send(data);
    // console.log(data);
    if(requests)
    {
        // return res.send(data);
    }
    else
    return res.status(400).json({err: "No Requests Found"});
}