import { IssueBookRequest } from '../../models/issueRequest';
import { IEditStatus } from '../../interfaces/interfaces';


export default async function editBookRequestStatus(data: IEditStatus){
  /** Update Status */
  try{
      const { status, bookId } = data;
      
      await IssueBookRequest.updateOne(
        { _id: bookId },
        {
          $set: { status: status },
          $currentDate: { lastModified: true }
        }
        )

        /** Fetching updated list and sending to client */
        const request = await IssueBookRequest.findOne({_id: bookId})
         console.log(request);
        return ({request, msg: "Book Request updated"});
    }
    catch(err){
      console.log("Error in editStatus api: ", err);
        return {msg: (err)};
    }
}