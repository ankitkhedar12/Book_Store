import { Request, RequestHandler, Response } from 'express';
import dotenv from 'dotenv';
import { BookModel } from '../models/bookModel';
import { IAddBookData } from '../interfaces/interfaces';


dotenv.config({
    path: '.env'
  });

export default async function addbooks(data: IAddBookData){
    try {
      const { title, author, price, quantity } = data;
      
      // check if book already exist
      const oldBook = await BookModel.findOne({ title });
      if (oldBook) {
        // await BookModel.updateOne( { title: title }, { $set: { quantity: quantity }, $currentDate: { lastModified: true }})
        return {msg: "Book Already Exist", status: 200}
      }

      // Create New Book
      const book = await BookModel.create({ title, author, price, quantity });
      return {msg: "Book Added", book};

    } catch (error) {
      console.log("Error in addBooks api: ",error);
    }
}