import { Request, RequestHandler, Response } from 'express';
import { IssueBookRequest } from '../../models/issueRequest';

export  const reqList: RequestHandler = async ()=> {    
    try {
        /** Fetching request data with names of user and book from their id's */
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
        
        if(data)
        {
            return data;
        }
        else
        return {err: "No Requests Found"};
    } catch (error) {
        console.log("Error in ReqList Api: ", error);
    }
}