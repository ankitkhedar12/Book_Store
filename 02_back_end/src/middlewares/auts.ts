import jwt from "jsonwebtoken";
import { Request, RequestHandler, Response, NextFunction } from 'express';
import { User } from "../models/user";
import dotenv from 'dotenv';

// load the environment variables from the .env file
dotenv.config({
  path: '../../.env'
});

const authUser = async (req: Request, res: Response, next: NextFunction) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1]
    jwt.verify(token, "JWT_SECRET", async function (err, decode) {
      const user = await User.findOne({_id: req.headers.id})
      
      const role = user?.role

      if(role === 'user'){
        next()
      }
      else{
        console.log("----------not User------------")
      }
      // next();
    });
  } 
};
export default authUser;