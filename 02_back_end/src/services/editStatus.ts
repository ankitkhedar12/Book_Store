import { IssueBookRequest } from '../models/issueRequest';
import { IEditStatus } from '../interfaces/interfaces';


export default async function editStatus(data: IEditStatus){
    const { status, bookId } = data;

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
        return ({request, msg: "Book Request updated"});
    }
    catch(err){
      console.log("Error in editStatus api: ", err);
        return {msg: (err)};
    }
}