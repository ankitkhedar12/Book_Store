import { Request, RequestHandler, Response } from 'express';
import { User } from '../models/user';

export  const userList: RequestHandler = async (req: Request, res: Response)=> {    

    const users = await User.find({});

    // If users are found
    if(users)
    {
        // return response with user and send to client
        // const { name, email, password, role } = user;
        return res.send(users);
    }
    else
    return res.status(400).json({err: "No Users Found"});

    // res.end(Login(email, password)) 
}