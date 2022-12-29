import { IssueBookRequest } from '../../models/issueRequest';
import { IUserReqList } from '../../interfaces/interfaces';
import { ObjectId } from "mongodb";

export const myRequests = async (userData: IUserReqList)=> {    
    try {
        const { user_id } = userData;

        //Fetching book issue requests of particular users using their id
        const data = await IssueBookRequest.aggregate([
            {
                $match: {"user_id": new ObjectId(user_id)}
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

        return (data);
    } catch (error) {
        console.log("Error in MyRequests api", error);
    }
}