import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from 'express';
import envData from '../config/env.config';

const authUser = async (req: Request, res: Response, next: NextFunction) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1]
    
    try {
      if (token) {
        const verify = jwt.verify(token, envData.jwt_secret                      // keys.jwtSecret as string
        ) as jwt.JwtPayload;
        
        if (verify) {
          req.body['user_id'] = verify.id;
          next()
        }
      }else{
        console.log("Token Not Found.");
      }
    }
    catch(error){
      res.status(401).send({
        message: "YOUR SESSION HAS EXPIRED. PLEASE LOGIN AGAIN.",
        success: false,
        error: "token-expired",
      })
    }
};
}
export default authUser;