import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from 'express';
import { User } from "../models/user";
import dotenv from 'dotenv';
import { IJwtPayload } from "../interfaces/interfaces";

// load the environment variables from the .env file
dotenv.config({
  path: '../../.env'
});

const authUser = async (req: Request, res: Response, next: NextFunction) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1]
    
    try {
      if (token) {
        const verify = jwt.verify(token,"JWT_SECRET"  // keys.jwtSecret as string
        ) as jwt.JwtPayload;
        
        if (verify) {
          const id  = verify.id;
          console.log("---Id---", id);

          const user = await User.findOne({_id: req.headers.id})
          const role = user?.role
            // const { id } = decode   

            if(role === 'user'){
              next()
            }
            else{
              console.log("----------not User------------")
            }
          // next();
        }
      }
    }
    catch(error){
      console.log("Error in userAuth: ",error);
    }

    // jwt.verify(token, "JWT_SECRET",  (err, decode: IJwtPayload) {

     
    //   console.log("Payload: ", decode)

      
    //   // next();
    // });
  } 
};
export default authUser;