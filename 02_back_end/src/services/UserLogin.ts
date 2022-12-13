import { Request, RequestHandler, Response } from 'express';
import dotenv from 'dotenv';
// import Login from '../services/UserLogin'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../models/user';

dotenv.config({
    path: '.env'
  });

export default async function signin(req: Request, res: Response){
    const email = req.body.email;
    console.log(req.body)

    const user = await User.findOne({email});
    console.log("LoginUser: ",user);
    // If user is found
    if(user)
    {
        const password1 = req.body.password;
        const password2 = await bcrypt.compare(password1, user.password)

        if(user.status === 'Deactivated'){
            return res.status(200).json({err: "User is inactive", value: 4})
        }
        // make sure email and password match
        // create authenticate method in user model
        if(!password2)
        {
            return res.status(200).json({err: "Invalid Credentials", value: 3})
        }

        // generate a signed token with user id and secret
        const token = jwt.sign({id:user._id}, "JWT_SECRET")

        // return response with user and send to client
        const{ _id, email, password } = user;

        if(user.role === 'admin'){
            return res.status(200).json({token, user: {_id, email, password}, value: 5});
        }

        return res.status(200).json({token, user: {_id, email, password}, value: 1});
        // return res.status(200).json({token, email, value: 1});

    }


    else
    return res.status(200).json({err: "Email not found", value: 2})
}
