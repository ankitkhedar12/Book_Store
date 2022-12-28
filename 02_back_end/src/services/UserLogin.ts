import { Request, RequestHandler, Response } from 'express';
import dotenv from 'dotenv';
// import Login from '../services/UserLogin'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../models/user';
import envData from '../config/env.config';
import { Constants } from '../constants/constants';
import { ISigninData } from '../interfaces/interfaces';

dotenv.config({
    path: '.env'
  });

export default async function signin(data: ISigninData){
    try {
        const { email, password } = data;

        const user = await User.findOne({ email });

        // If user is found
        if(user)
        {
            const{ _id} = user;

            //Checking if founded user is deactivaed or not
            if(user.status === 'Deactivated'){
                return {msg: "User is Deactivated", status: 200}
            }
            
            // make sure email and password match
            // create authenticate method in user model
            const isValidPass = await bcrypt.compare(password, user.password)

            if(!isValidPass)
            {
                return {msg: "Invalid Credentials", status: 200}
            }

            // generate a signed token with user id and secret
            const token = jwt.sign({id:user._id}, envData.jwt_secret)

            // return response with user and send to client
            if(user.role === Constants.admin){
                return {msg: "Admin Login",token, user: {_id, email}};
            }
            return {msg: "Welcome Back",token, user: {_id, email}};
        }
        else
        return {msg: "User not registered"};
    } catch (error) {
        console.log("Error in UserLogin api: ", error);
    }
}
