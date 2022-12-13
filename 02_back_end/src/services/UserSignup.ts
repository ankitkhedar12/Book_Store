import { Request, RequestHandler, Response } from 'express';
import  jwt  from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt'

import { User } from '../models/user';

dotenv.config({
    path: '.env'
  });

export default async function signup(req: Request, res: Response){

    const { email } = req.body;

    // // Validate user input
    // if (!(email && password1 && name )) {
    //   res.status(200).json({msg:"All input is required", value:2});
    // }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.status(200).json({msg: "User Already Exist. Please Login", value: 1})
    }


    // // Create user in our database (Alternate Method)
    // const user = await User.create({
    //   name,
    //   email: email.toLowerCase(), // sanitize: convert email to lowercase
    //   password: password,
    // });

    // Create New User
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      role: 'user',
      password: bcrypt.hashSync(req.body.password, 8),
      status: 'active'
    });

    // Save
    await user.save((err, user) => {
      if (err) {
        res.status(500)
          .send({
            message: err
          });
        return;
      } else {
        res.status(200)
          .send({user, value:4})
      }
    // });

    // await user.save((err, user) => {
    //   if(err)
    //   {
    //       return res.status(200).json({msg: (err), value: 3});
    //   }
      // user.hashed_password = undefined;
      // user.salt = undefined;
      
      res.status(200).json({user, value:4});
  })

    console.log("User Created: ", user)
}