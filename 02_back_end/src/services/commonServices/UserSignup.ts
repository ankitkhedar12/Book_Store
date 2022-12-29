import { Request, RequestHandler, Response } from 'express';
import  jwt  from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt'
import { ISignupData } from '../../interfaces/interfaces';
import { User } from '../../models/user';

dotenv.config({
    path: '.env'
  });

export default async function signup(data:ISignupData){
    try {
      const { email, name, password, role, status } = data;

      // check if user already exist
      // Validate if user exist in our database
      const oldUser = await User.findOne({ email });
      if (oldUser) {
        return {msg: "User Already Exist. Please Signin", status: 200};
      }

      // // Create user in our database (Alternate Method)
      // const user = await User.create({
      //   name,
      //   email: email.toLowerCase(), // sanitize: convert email to lowercase
      //   password: password,
      // });

      // Create New User
      const user = await User.create({name, email, role, password: bcrypt.hashSync(password, 8), status});
      
      return {msg: "Please Login", status: 200};

    } catch (error) {
      console.log("Error in UserSignup api: ", error);
    }
}