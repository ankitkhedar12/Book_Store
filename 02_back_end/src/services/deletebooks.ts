import { BookModel } from '../models/bookModel';
import { IDeleteBook } from '../interfaces/interfaces';

export default async function deletebooks(data: IDeleteBook){
  try {
    const { bookId } = data;

    // Delete
    await BookModel.deleteOne({ "_id": bookId });
    return {msg: "Book Deleted", status: 200};
    
  } catch (error) {
    console.log("Error in DeleteBook api: ", error);
  }
}