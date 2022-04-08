import { Request, Response, NextFunction } from 'express';
import  UserModel  from '../models/User';

export const registerUser = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = req.body
  
  
  try {
    if (!firstName || !lastName || !email || 
      !password) {
      return res.status(400).json({ message: 'Please fill all fields' });
    }
    
    const user = await UserModel.create({ firstName, lastName, email, password });

    res.status(200).json({ data: user, message: 'user created successfully' });
  } catch (error: any) {
    console.log(error, "333333333333333333333")
    throw new Error(error);
  }
};


export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    if ( !email || !password) {
      return res.status(400).json({ message: 'Please fill all fields' });
    }

    const user = await UserModel.findOne({ email });
    
     if (!user) {
       return res.status(400).json({ message: 'A user with this email does not exist' });
     }

    res.status(200).json({ data: user, message: 'Login successful' });
  } catch (error: any) {
    throw new Error(error);
  }
};