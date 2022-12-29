import { ISearchValue } from '../../interfaces/interfaces';
import { BookModel } from '../../models/bookModel';

export  const searchBook = async (data: ISearchValue)=> {    
    const { searchValue } = data;

    /** Searching books with their title */
    const books = await BookModel.find({title: {$regex: searchValue, $options: 'i'}});

    /** If books found on searching acd to title */
    if(books)
    {
        /** return response with user and send to client */
        return books;
    }
    else
    return {err: "No Books Found"};
}