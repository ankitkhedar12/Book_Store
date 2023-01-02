import { IssueBookRequest } from '../../models/issueRequest';
import { BookModel } from '../../models/bookModel';
import { IRequest } from '../../interfaces/interfaces';
import dayjs from 'dayjs';
import min from 'dayjs';

export default async function issueBooks(data: IRequest){
  try {
    const {user_id, book_id, status, from_date, to_date } = data;
    const formattedStartDate = dayjs(from_date).format('DD/MM/YYYY');
    const formattedEndDate = dayjs(to_date).format('DD/MM/YYYY');
    
    /** Validation if date are selected or not */
    if(from_date === undefined){
      return {msg: "Date_not_selected", status: 200};
    }

    /** Validation if selected date is not earlier than today */
    if(dayjs(from_date).isBefore(dayjs(), 'date')){
      console.log("Date cannot be in Past ");
      return {msg: "Issue Date cannot be in past", status: 200};
    }
    
    /** If user has already added one book, he should not be able to add more */
    const reqAlreadyExist = await IssueBookRequest.findOne({ user_id: user_id, book_id: book_id })
      if(reqAlreadyExist){
        return {msg: "Request Exists", status: 200};
      }

    /** Checks whether book quantity is 0 or not, also updates the value of new book quantity */
    const book = await BookModel.findOne({_id: book_id});
    const newBookquantity = book?.quantity;
    if(newBookquantity){
      await BookModel.updateOne(
        { _id: book_id },
        {
          $set: { quantity: newBookquantity-1 },
          $currentDate: { lastModified: true }
        }
      )
    }
    else{
      return {msg: "Book not available", status: 200}
    }
      
    // Create New Book Issue Request
    await IssueBookRequest.create({ user_id, book_id, status, from_date: formattedStartDate, to_date: formattedEndDate });

    return {msg: "Book Requested", status: 200};
  } catch (error) {
    console.log("Error in issueBook api: ", error);
  }

}