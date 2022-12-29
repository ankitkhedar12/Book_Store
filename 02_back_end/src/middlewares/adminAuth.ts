import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from 'express';
import { User } from "../models/user";
import dotenv from 'dotenv';
import envData from '../config/env.config';

// load the environment variables from the .env file
dotenv.config({
  path: '../../.env'
});

const authAdmin = async (req: Request, res: Response, next: NextFunction) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1]
    try {
      if (token) {
        const verify = jwt.verify(token,envData.jwt_secret                          // keys.jwtSecret as string
        ) as jwt.JwtPayload;
        
        if (verify) {
          const id  = verify.id;

          const user = await User.findOne({_id: id})
          const role = user?.role 

            if(role === 'admin'){
              next()
            }
            else{
              console.log("----------not Admin------------")
            } 
        }
      }
    }
    catch(error){
      console.log("Error in userAuth: ",error);
    }
  } 
};
export default authAdmin;