import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from 'express';
import { User } from "../models/user";
import envData from '../config/env.config';
import { Constants } from "../constants/constants";

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

            if(role === Constants.ADMIN){
              next()
            }
            else{
              console.log("-----------not Admin------------")
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