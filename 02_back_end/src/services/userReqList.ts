import { Request, RequestHandler, Response } from 'express';
import { IssueBookRequest } from '../models/issueRequest';
import { User } from '../models/user';
import { BookModel } from '../models/bookModel';
import { IUserReqList } from '../interfaces/interfaces';

export const userReqList = async (userData: IUserReqList)=> {    

    const { id } = userData;
    console.log("id----", id)
    // const user = await User.findOne({ _id: id });

    // const requests = await IssueBookRequest.find({});

    const data = await IssueBookRequest.aggregate([
        {
            $match: {user_id: id}
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
                // user_name: "$user.name",
                status: 1,
                from_date: 1,
                to_date: 1
            }
        }
    ]);
    // if(id){
    //     let userReq = []
    //     for(let i of data){
    //         if(i.user_name === user?.name){
    //             // console.log("name:",user?.name);
    //             // console.log("i.user_name:",user?.name);
    //             userReq.push(i);
    //         }
    //     }
    //     return res.send(userReq);
    // }
    console.log("UserREqList: : : ", data);
    return (data);
    // // console.log(data);
    // if(requests)
    // {
    //     // return res.send(data);
    // }
    // else
    // return res.status(400).json({err: "No Requests Found"});
}